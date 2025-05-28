import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar, faLock, faCalendarDay, faLink, faPrint, faFilePdf, faCheck
} from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';
import { supabase } from '../config/supabaseClient';
import { validate as uuidValidate } from 'uuid';

function NoteView() {
    const { link } = useParams();
    const [note, setNote] = useState(null);
    const contentRef = useRef();
    const [showCopied, setShowCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSharedNote = async () => {
            try {
                setLoading(true);
                setError(null);

                // Link kontrolü
                if (!link) {
                    throw new Error("Bağlantı bulunamadı.");
                }

                if (!uuidValidate(link)) {
                    throw new Error("Geçersiz bağlantı formatı.");
                }

                // Önce cache'i kontrol et
                const cacheKey = `note_${link}`;
                const cachedNote = sessionStorage.getItem(cacheKey);

                if (cachedNote) {
                    try {
                        const parsedNote = JSON.parse(cachedNote);
                        // Cache 5 dakika geçerli
                        if (Date.now() - parsedNote.cached_at < 5 * 60 * 1000) {
                            setNote(parsedNote.data);
                            setLoading(false);
                            return;
                        }
                    } catch (e) {
                        // Cache parse hatası, devam et
                        sessionStorage.removeItem(cacheKey);
                    }
                }

                // Anonim kullanıcılar için erişim sağlamak adına service role kullan
                const { data, error: supabaseError } = await supabase
                    .from('note')
                    .select('*')
                    .eq('link_id', link)
                    .eq('is_private', false) // Sadece gizli olmayan notları getir
                    .single();

                if (supabaseError) {
                    console.error('Supabase error:', supabaseError);
                    if (supabaseError.code === 'PGRST116') {
                        throw new Error('Not bulunamadı, gizli olabilir veya artık mevcut değil.');
                    }
                    throw new Error('Veritabanı hatası: ' + supabaseError.message);
                }

                if (!data) {
                    throw new Error('Not bulunamadı veya gizli.');
                }

                // Cache'e kaydet
                const cacheData = {
                    data: data,
                    cached_at: Date.now()
                };
                sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));

                setNote(data);
            } catch (err) {
                console.error('Paylaşılan not yüklenirken hata:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSharedNote();
    }, [link]);

    const formatDate = (dateString) => {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('tr-TR', options);
        } catch (err) {
            return 'Tarih belirtilmemiş';
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handlePdf = async () => {
        try {
            const content = contentRef.current;
            if (!content) {
                console.error('İçerik referansı bulunamadı');
                return;
            }

            const opt = {
                margin: [2, 2, 2, 2],
                filename: `${note.title || 'not'}.pdf`,
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true
                },
                jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().from(content).set(opt).save();
        } catch (err) {
            console.error('PDF oluşturma hatası:', err);
        }
    };

    const handleShare = async () => {
        try {
            const url = `${window.location.origin}/note/${note.link_id}`;

            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(url);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error('Paylaşım hatası:', err);
        }
    };

    // Loading durumu
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow dark:shadow-slate-700/20 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-slate-300">Not yükleniyor...</p>
                </div>
            </div>
        );
    }

    // Error durumu
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow dark:shadow-slate-700/20 text-center max-w-md">
                    <div className="text-red-500 dark:text-red-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-slate-100">Bir sorun oluştu</h2>
                    <p className="text-gray-600 dark:text-slate-300 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                    >
                        Yeniden Dene
                    </button>
                </div>
            </div>
        );
    }

    // Not bulunamadı durumu
    if (!note) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow dark:shadow-slate-700/20 text-center max-w-md">
                    <div className="text-gray-400 dark:text-slate-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-slate-100">Not bulunamadı</h2>
                    <p className="text-gray-600 dark:text-slate-300">Bu bağlantı geçersiz, not silinmiş veya artık mevcut değil.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 px-4 transition-colors">
            <div className="max-w-7xl mx-auto">
                {/* Header - No Print */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm dark:shadow-slate-700/20 p-6 mb-4 no-print border dark:border-slate-700">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                            <FontAwesomeIcon icon={faCalendarDay} />
                            {formatDate(note.created_at)}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={handleShare}
                                className="hover:scale-105 flex items-center gap-1 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg transition text-sm border dark:border-indigo-800"
                                disabled={showCopied}
                            >
                                <FontAwesomeIcon icon={showCopied ? faCheck : faLink} />
                                {showCopied ? 'Kopyalandı!' : 'Paylaş'}
                            </button>
                            <button
                                onClick={handlePdf}
                                className="hover:scale-105 flex items-center gap-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 dark:text-red-400 rounded-lg transition text-sm border dark:border-red-800"
                            >
                                <FontAwesomeIcon icon={faFilePdf} />
                                PDF
                            </button>
                            <button
                                onClick={handlePrint}
                                className="hover:scale-105 flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 rounded-lg transition text-sm border dark:border-slate-600"
                            >
                                <FontAwesomeIcon icon={faPrint} />
                                Yazdır
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content - Printable */}
                <div className="note-content-wrapper bg-white dark:bg-slate-800 rounded-lg shadow-sm dark:shadow-slate-700/20 p-6 border dark:border-slate-700">
                    <h1 className="note-title text-3xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-3 break-all mb-6">
                        {note.title || 'Başlıksız Not'}
                        {note.is_favorite && (
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400 dark:text-yellow-300" title="Favori" />
                        )}
                        {note.is_private && (
                            <FontAwesomeIcon icon={faLock} className="text-gray-400 dark:text-slate-500" title="Gizli" />
                        )}
                    </h1>
                    <div
                        ref={contentRef}
                        className="note-content prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-slate-100 prose-p:text-gray-700 dark:prose-p:text-slate-300 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-strong:text-gray-900 dark:prose-strong:text-slate-100 prose-code:text-gray-800 dark:prose-code:text-slate-200 prose-pre:bg-gray-50 dark:prose-pre:bg-slate-800 prose-blockquote:border-gray-300 dark:prose-blockquote:border-slate-600"
                        dangerouslySetInnerHTML={{ __html: note.content || '<p>İçerik bulunamadı.</p>' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default NoteView;