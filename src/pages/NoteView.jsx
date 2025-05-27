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
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Not yükleniyor...</p>
                </div>
            </div>
        );
    }

    // Error durumu
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white p-8 rounded-lg shadow text-center max-w-md">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">Bir sorun oluştu</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
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
                <div className="bg-white p-8 rounded-lg shadow text-center max-w-md">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">Not bulunamadı</h2>
                    <p className="text-gray-600">Bu bağlantı geçersiz, not silinmiş veya artık mevcut değil.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header - No Print */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-4 no-print">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FontAwesomeIcon icon={faCalendarDay} />
                            {formatDate(note.created_at)}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={handleShare}
                                className="hover:scale-105 flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition text-sm"
                                disabled={showCopied}
                            >
                                <FontAwesomeIcon icon={showCopied ? faCheck : faLink} />
                                {showCopied ? 'Kopyalandı!' : 'Paylaş'}
                            </button>
                            <button
                                onClick={handlePdf}
                                className="hover:scale-105 flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition text-sm"
                            >
                                <FontAwesomeIcon icon={faFilePdf} />
                                PDF
                            </button>
                            <button
                                onClick={handlePrint}
                                className="hover:scale-105 flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition text-sm"
                            >
                                <FontAwesomeIcon icon={faPrint} />
                                Yazdır
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content - Printable */}
                <div className="note-content-wrapper bg-white rounded-lg shadow-sm p-6">
                    <h1 className="note-title text-3xl font-bold text-gray-900 flex items-center gap-3 break-all mb-6">
                        {note.title || 'Başlıksız Not'}
                        {note.is_favorite && (
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400" title="Favori" />
                        )}
                        {note.is_private && (
                            <FontAwesomeIcon icon={faLock} className="text-gray-400" title="Gizli" />
                        )}
                    </h1>
                    <div
                        ref={contentRef}
                        className="note-content prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: note.content || '<p>İçerik bulunamadı.</p>' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default NoteView;