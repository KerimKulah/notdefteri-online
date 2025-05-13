import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faLock,
    faCalendarDay,
    faLink,
    faPrint,
    faFilePdf,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';

function NoteView() {
    const { link } = useParams();
    const notes = useSelector(state => state.note.notes);
    const note = notes.find(n => n.link_id === link);
    const contentRef = useRef();
    const [showCopied, setShowCopied] = useState(false);

    if (!note) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <h2 className="text-2xl font-bold mb-2">Not bulunamadı</h2>
                    <p className="text-gray-500">Paylaşılan bağlantı hatalı veya not silinmiş olabilir.</p>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    const handlePrint = () => {
        window.print();
    };

    const handlePdf = () => {
        const content = contentRef.current;
        const opt = {
            margin: [2, 2, 2, 2],
            filename: `${note.title || 'not'}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(content).set(opt).save();
    };

    const handleShare = async () => {
        const url = `${window.location.origin}/note/${note.link_id}`;
        await navigator.clipboard.writeText(url);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };

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
                                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-lg transition text-sm"
                            >
                                <FontAwesomeIcon icon={showCopied ? faCheck : faLink} />
                                {showCopied ? 'Kopyalandı!' : 'Paylaş'}
                            </button>
                            <button
                                onClick={handlePdf}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition text-sm"
                            >
                                <FontAwesomeIcon icon={faFilePdf} />
                                PDF
                            </button>
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition text-sm"
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
                        {note.title}
                        {note.is_favorite && (
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        )}
                        {note.is_private && (
                            <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                        )}
                    </h1>
                    <div
                        ref={contentRef}
                        className="note-content"
                        dangerouslySetInnerHTML={{ __html: note.content }}
                    />
                </div>
            </div>
        </div>
    );
}

export default NoteView;