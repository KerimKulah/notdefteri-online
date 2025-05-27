import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, updateNote } from '../redux/NoteSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLock, faStar } from '@fortawesome/free-solid-svg-icons';
import Quill from 'quill';
import { useDarkMode } from "../context/DarkModeContext";

const INITIAL_FORM_STATE = {
    title: '',
    content: '',
    is_private: false,
    is_favorite: false,
    folder_id: null,
};

const Size = Quill.import('formats/size');
Size.whitelist = ['12px', '14px', '16px', '18px', '24px', '32px'];
Quill.register(Size, true);

const QUILL_MODULES = {
    toolbar: [
        [{ font: [] }],
        [{ 'size': ['12px', '14px', '16px', '18px', '24px', '32px'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'image', 'code-block'],
        ['clean']
    ],
};

const NoteModal = ({ isOpen, onClose, note }) => {
    const dispatch = useDispatch();
    const folders = useSelector(state => state.folder.folders);
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const quillRef = useRef();
    const { darkMode } = useDarkMode();

    useEffect(() => {
        if (isOpen) {
            setFormData(note || INITIAL_FORM_STATE);
        }
    }, [isOpen, note]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Dark mode class'ını body'ye ekle/çıkar
    useEffect(() => {
        if (isOpen) {
            if (darkMode) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }

        return () => {
            if (!isOpen) {
                // Modal kapandığında class'ı temizle (gerekirse)
                // Burada genel dark mode durumunu kontrol edebilirsiniz
            }
        };
    }, [darkMode, isOpen]);

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleToggle = useCallback((field) => {
        setFormData(prev => ({ ...prev, [field]: !prev[field] }));
    }, []);

    const handleSubmit = async () => {
        try {
            if (!formData.title.trim()) {
                alert('Lütfen bir başlık giriniz');
                return;
            }

            const action = note
                ? updateNote({ id: note.id, updates: formData })
                : createNote(formData);

            await dispatch(action);
            onClose();
        } catch (error) {
            console.error("Not işlemi sırasında hata:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/50">
            <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
                <div className={`rounded-xl w-full max-w-3xl shadow-2xl relative max-h-[90vh] flex flex-col my-auto animate-modal-open ${darkMode
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-black'
                    }`}>
                    {/* Header */}
                    <div className={`flex justify-between items-center p-4 border-b ${darkMode
                        ? 'border-gray-700'
                        : 'border-gray-200'
                        }`}>
                        <input
                            name="title"
                            placeholder="Not başlığı..."
                            className={`w-full text-xl font-semibold border-none focus:outline-none focus:ring-0 bg-transparent ${darkMode
                                ? 'placeholder-gray-400 text-white'
                                : 'placeholder-gray-400 text-black'
                                }`}
                            value={formData.title}
                            onChange={e => handleInputChange('title', e.target.value)}
                        />
                        <button
                            onClick={onClose}
                            className={`p-2 rounded-full transition-colors ${darkMode
                                ? 'hover:bg-gray-700 text-gray-400'
                                : 'hover:bg-gray-100 text-gray-500'
                                }`}
                            aria-label="Kapat"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    {/* Editor */}
                    <div className="flex-1 overflow-hidden">
                        <div className={`flex flex-col h-full quill-wrapper ${darkMode ? 'dark' : ''}`}>
                            <ReactQuill
                                ref={quillRef}
                                modules={QUILL_MODULES}
                                value={formData.content}
                                onChange={value => handleInputChange('content', value)}
                                theme="snow"
                                placeholder="İçeriğinizi buraya yazın..."
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`p-4 rounded-b-xl border-t ${darkMode
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-gray-50 border-gray-200'
                        }`}>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-1">
                                <select
                                    value={formData.folder_id || ""}
                                    onChange={e => handleInputChange('folder_id', e.target.value === "" ? null : e.target.value)}
                                    className={`w-full max-w-xs px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${darkMode
                                        ? 'bg-gray-600 border-gray-500 text-white hover:bg-gray-500'
                                        : 'bg-white border-gray-300 text-black hover:bg-gray-100'
                                        }`}>
                                    <option value="">Klasör seçin</option>
                                    {folders.map(folder => (
                                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-4 flex-wrap">
                                <button
                                    onClick={() => handleToggle('is_private')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${formData.is_private
                                        ? (darkMode
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-purple-200 text-black')
                                        : (darkMode
                                            ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faLock} />
                                    <span>Özel</span>
                                </button>

                                <button
                                    onClick={() => handleToggle('is_favorite')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${formData.is_favorite
                                        ? (darkMode
                                            ? 'bg-yellow-600 text-white'
                                            : 'bg-yellow-200 text-black')
                                        : (darkMode
                                            ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faStar} />
                                    <span>Favori</span>
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className={`px-6 py-2 rounded-lg transition-all focus:ring-2 focus:ring-blue-400 ${darkMode
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-blue-600 text-white hover:bg-blue-800'
                                        }`}
                                >
                                    {note ? 'Güncelle' : 'Kaydet'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;