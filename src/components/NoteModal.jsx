import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, updateNote } from '../redux/NoteSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLock, faStar, faFolder } from '@fortawesome/free-solid-svg-icons';

const INITIAL_FORM_STATE = {
    title: '',
    content: '',
    is_private: false,
    is_favorite: false,
    folder_id: null,
};

const QUILL_MODULES = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
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

    useEffect(() => {
        setFormData(note || INITIAL_FORM_STATE);
    }, [note]);

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
                <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl relative max-h-[90vh] flex flex-col my-auto animate-modal-open">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <input
                            name="title"
                            placeholder="Not başlığı..."
                            className="w-full text-xl font-semibold border-none focus:outline-none focus:ring-0 placeholder-gray-400"
                            value={formData.title}
                            onChange={e => handleInputChange('title', e.target.value)}
                        />
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Kapat"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Editor */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col h-full quill-wrapper">
                            <ReactQuill
                                modules={QUILL_MODULES}
                                value={formData.content}
                                onChange={value => handleInputChange('content', value)}
                                theme="snow"
                                placeholder="İçeriğinizi buraya yazın..."
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-gray-50 rounded-b-xl border-t">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-1">
                                <select
                                    value={formData.folder_id || ""}
                                    onChange={e => handleInputChange('folder_id', e.target.value === "" ? null : e.target.value)}
                                    className="w-full max-w-xs px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">📁 Klasör seçin</option>
                                    {folders.map(folder => (
                                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-4 flex-wrap">
                                <button
                                    onClick={() => handleToggle('is_private')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 
                                        ${formData.is_private
                                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <FontAwesomeIcon icon={faLock} />
                                    <span>Özel</span>
                                </button>

                                <button
                                    onClick={() => handleToggle('is_favorite')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105
                                        ${formData.is_favorite
                                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <FontAwesomeIcon icon={faStar} />
                                    <span>Favori</span>
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105 focus:ring-2 focus:ring-blue-400"
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