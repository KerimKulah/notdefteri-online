import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faLayerGroup, faStar, faFolder, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { newFolder, updateFolder, deleteFolder, getFolders, setFilter, setSelectedFolder } from '../redux/FolderSlice';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const iconColorClasses = {
    red: 'text-red-500',
    blue: 'text-indigo-600',
    green: 'text-green-500',
    yellow: 'text-yellow-200',
    gray: 'text-gray-500',
    purple: 'text-purple-500',
};

const colorClasses = {
    red: 'bg-red-500',
    blue: 'bg-indigo-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-200',
    gray: 'bg-gray-500',
    purple: 'bg-purple-500',
};

function Sidebar() {
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.folder.folders);
    const notes = useSelector((state) => state.note.notes);
    const favoriteNotes = useSelector((state) => state.note.favoriteNotes);
    const selectedFolder = useSelector((state) => state.folder.selectedFolder);
    const filter = useSelector((state) => state.folder.filter);
    const [editingFolderId, setEditingFolderId] = useState(null);
    const [colorPickerId, setColorPickerId] = useState(null);

    useEffect(() => {
        dispatch(getFolders());
    }, [dispatch]);

    useEffect(() => {
        if (colorPickerId !== null) {
            const handleClick = (e) => {
                const colorPicker = document.getElementById(`color-picker-${colorPickerId}`);
                if (colorPicker && colorPicker.contains(e.target)) return;
                setColorPickerId(null);
            };
            window.addEventListener('mousedown', handleClick);
            return () => window.removeEventListener('mousedown', handleClick);
        }
    }, [colorPickerId]);

    const handleNewFolder = async () => {
        const folder = { name: 'Yeni Klasör', color: 'gray' };
        const action = await dispatch(newFolder(folder));
        const newFolderData = action.payload && action.payload[0];
        if (newFolderData?.id) setEditingFolderId(newFolderData.id);
    };

    const handleNameChange = (id, value) => {
        if (value.trim() === "") return;
        dispatch(updateFolder({ id, updates: { name: value } }));
        setEditingFolderId(null);
    };

    const handleColorChange = (id, color) => {
        dispatch(updateFolder({ id, updates: { color } }));
        setColorPickerId(null);
    };

    const handleDeleteFolder = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => (
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto mt-40">
                    <h2 className="text-xl font-bold mb-4">Klasörü Sil</h2>
                    <p className="mb-6 text-gray-600">Bu klasörü silmek istediğinize emin misiniz?</p>
                    <div className="flex justify-end gap-3">
                        <button
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={onClose}>
                            İptal
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            onClick={() => { dispatch(deleteFolder(id)); onClose(); }}>
                            Sil
                        </button>
                    </div>
                </div>
            )
        });
    };

    const getFolderNoteCount = (folderId) =>
        notes.filter(note => note.folder_id === folderId).length;

    return (
        <div className="sidebar-container w-64 bg-white p-4 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Klasörler</h2>
                <button
                    onClick={handleNewFolder}
                    className="hover:scale-105 hover:text-indigo-800 w-8 h-8 flex items-center justify-center text-indigo-600 rounded-lg transition-colors">
                    <FontAwesomeIcon icon={faFolderPlus} />
                </button>
            </div>

            <div className="space-y-2 mb-4">
                <button
                    onClick={() => dispatch(setFilter('all'))}
                    className={`hover:scale-105 flex items-center w-full p-2.5 rounded-lg transition-colors ${filter === 'all'
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                        }`}>
                    <FontAwesomeIcon icon={faLayerGroup} className="w-4 h-4" />
                    <span className="ml-2 flex-1">Tüm Notlar</span>
                    <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-md text-xs font-medium min-w-[1.5rem] text-center">
                        {notes.length}
                    </span>
                </button>

                <button
                    onClick={() => dispatch(setFilter('favorite'))}
                    className={`hover:scale-105 flex items-center w-full p-2.5 rounded-lg transition-colors ${filter === 'favorite'
                        ? 'bg-yellow-200 text-black'
                        : 'hover:bg-gray-100 text-gray-700'
                        }`}>
                    <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
                    <span className="ml-2 flex-1">Favoriler</span>
                    <span className="bg-yellow-200 text-black px-2 py-0.5 rounded-md text-xs font-medium min-w-[1.5rem] text-center">
                        {favoriteNotes.length}
                    </span>
                </button>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Oluşturulanlar
                </h3>

                <ul className="space-y-1">
                    {folders.length === 0 ? (
                        <li className="text-gray-400 text-sm px-2 py-3 text-center select-none">
                            Henüz oluşturduğunuz klasör yok.
                        </li>
                    ) : (
                        folders.map((folder) => (
                            <li key={folder.id} onClick={() => dispatch(setSelectedFolder(folder))}
                                className={`hover:scale-105 rounded-lg cursor-pointer transition-colors ${selectedFolder?.id === folder.id
                                    ? 'bg-gray-200'
                                    : 'hover:bg-gray-100'
                                    }`}>
                                <div className="p-2 flex items-center">
                                    <span onClick={(e) => { e.stopPropagation(); setColorPickerId(folder.id) }}
                                        className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faFolder} className={`${iconColorClasses[folder.color]} text-base`} />
                                    </span>

                                    <div className="ml-2 flex-1 min-w-0 flex items-center">
                                        {editingFolderId === folder.id ? (
                                            <input autoFocus type="text" className="w-full px-2 py-1 text-sm border rounded bg-white"
                                                defaultValue={folder.name}
                                                placeholder="Klasör adı..."
                                                onClick={e => e.stopPropagation()}
                                                onBlur={e => handleNameChange(folder.id, e.target.value)}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter') handleNameChange(folder.id, e.target.value);
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <span className="truncate text-sm" title={folder.name}>
                                                    {folder.name}
                                                </span>
                                                <div className="ml-auto flex items-center gap-1.5">
                                                    <span className="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-xs min-w-[1.25rem] text-center">
                                                        {getFolderNoteCount(folder.id)}
                                                    </span>
                                                    <button onClick={(e) => { e.stopPropagation(); setEditingFolderId(folder.id) }}
                                                        className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
                                                        <FontAwesomeIcon icon={faPen} className="w-3 h-3" />
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.id) }} className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors">
                                                        <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {colorPickerId === folder.id && (
                                    <div id={`color-picker-${folder.id}`}
                                        className="flex gap-2 p-2 pl-7"
                                        onClick={e => e.stopPropagation()}>
                                        {Object.keys(colorClasses).map((color) => (
                                            <button key={color}
                                                onClick={() => handleColorChange(folder.id, color)}
                                                className={`w-4 h-4 rounded-full ${colorClasses[color]} 
                    ${folder.color === color
                                                        ? 'ring-2 ring-offset-2 ring-gray-400'
                                                        : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-200'
                                                    } transition-all`} />
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;