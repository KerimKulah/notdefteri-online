import React, { useCallback, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faClock, faTrash, faShare } from '@fortawesome/free-solid-svg-icons';
import { deleteNote } from '../redux/NoteSlice';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

const NoteCard = memo(({ note, onClick }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getCleanTextContent = useCallback((html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = DOMPurify.sanitize(html);
        return tempDiv.textContent || tempDiv.innerText || '';
    }, []);

    const getTimeAgo = useCallback((date) => {
        return formatDistanceToNow(new Date(date), {
            addSuffix: true,
            locale: tr
        });
    }, []);

    const formatDate = useCallback((dateString) => {
        const options = { month: 'short', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', options).replace(/\//g, '.');
    }, []);

    const handleShare = useCallback((e) => {
        e.stopPropagation();
        navigate(`/note/${note.link_id}`);
    }, [note.link_id, navigate]);

    const onDelete = useCallback((e, id) => {
        e.stopPropagation();
        confirmAlert({
            customUI: ({ onClose }) => (
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-11/12 sm:w-96 mx-auto mt-20 sm:mt-40 text-center">
                    <h1 className="text-lg font-bold mb-2">Notu Sil</h1>
                    <p className="mb-4 text-gray-700">Bu notu silmek istediğinize emin misiniz?</p>
                    <div className="flex justify-center gap-2 sm:gap-3">
                        <button onClick={onClose} className="px-3 sm:px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base">
                            Vazgeç
                        </button>
                        <button
                            onClick={() => {
                                dispatch(deleteNote(id));
                                onClose();
                            }}
                            className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm sm:text-base">
                            Sil
                        </button>
                    </div>
                </div>
            )
        });
    }, [dispatch]);

    return (
        <div
            onClick={onClick}
            className="hover:scale-105 group h-auto min-h-[180px] sm:h-[230px] bg-white rounded-xl shadow-sm hover:shadow-md p-3 sm:p-5 transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer flex flex-col">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3 gap-1">
                <h5 className="font-semibold text-gray-800 text-base sm:text-lg truncate sm:pr-3 flex-1">
                    {note.title}
                </h5>
                <span className="text-xs text-gray-500 whitespace-nowrap flex items-center">
                    <FontAwesomeIcon icon={faCalendarDay} className="mr-1" />
                    {formatDate(note.created_at)}
                </span>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 flex-1 line-clamp-4 sm:line-clamp-6 overflow-hidden text-ellipsis break-words">
                {getCleanTextContent(note.content)}
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mt-auto">
                <span className="text-xs text-gray-400 flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    <span className="truncate">{getTimeAgo(note.updated_at)}</span>
                </span>

                <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleShare}
                        className="hover:scale-105 p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors relative group/tooltip">
                        <FontAwesomeIcon icon={faShare} />
                        <span className="invisible group-hover/tooltip:visible absolute -top-8 left-1/2 -translate-x-1/2 w-max bg-gray-800 text-white text-xs rounded px-2 py-1">
                            Notu Paylaş
                        </span>
                    </button>
                    <button
                        onClick={(e) => onDelete(e, note.id)}
                        className="hover:scale-105 p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors relative group/tooltip">
                        <FontAwesomeIcon icon={faTrash} />
                        <span className="invisible group-hover/tooltip:visible absolute -top-8 left-1/2 -translate-x-1/2 w-max bg-gray-800 text-white text-xs rounded px-2 py-1">
                            Notu Sil
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
});

NoteCard.displayName = 'NoteCard';

export default NoteCard;