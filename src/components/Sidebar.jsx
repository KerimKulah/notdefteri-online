import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faLayerGroup, faStar, faFolder, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { newFolder, updateFolder, deleteFolder, getFolders, setFilter, setSelectedFolder } from '../redux/FolderSlice';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDarkMode } from "../context/DarkModeContext";

const iconColorClasses = {
    red: 'text-red-500',
    blue: 'text-indigo-600',
    green: 'text-green-500',
    yellow: 'text-yellow-200',
    black: 'text-black',
    purple: 'text-purple-500',
};

const colorClasses = {
    red: 'bg-red-500',
    blue: 'bg-indigo-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-200',
    black: 'bg-black',
    purple: 'bg-purple-500',
};

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.folder.folders);
    const notes = useSelector((state) => state.note.notes);
    const favoriteNotes = useSelector((state) => state.note.favoriteNotes);
    const selectedFolder = useSelector((state) => state.folder.selectedFolder);
    const filter = useSelector((state) => state.folder.filter);
    const [editingFolderId, setEditingFolderId] = useState(null);
    const { darkMode, toggleDarkMode } = useDarkMode();

    const [colorPickerId, setColorPickerId] = useState(null);


    useEffect(() => {
        const handleClickOutside = (e) => {
            const sidebar = document.getElementById('mobile-sidebar');
            const hamburger = document.getElementById('hamburger-button');

            if (isSidebarOpen &&
                sidebar &&
                !sidebar.contains(e.target) &&
                hamburger &&
                !hamburger.contains(e.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen]);

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

    const handleFolderSelect = (folder) => {
        dispatch(setSelectedFolder(folder));
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    const handleNewFolder = async () => {
        const folder = { name: 'Yeni Klasör', color: 'black' };
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
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm mx-auto mt-40">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Klasörü Sil</h2>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">Bu klasörü silmek istediğinize emin misiniz?</p>
                    <div className="flex justify-end gap-3">
                        <button
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
        <>
            {isSidebarOpen && (
                <div
                    className="md:hidden inset-0 fixed "
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <div
                id="mobile-sidebar"
                className={`sidebar-container bg-white dark:bg-gray-800 p-4
                    fixed md:sticky top-16 h-[calc(100vh-64px)] overflow-y-auto
                    transition-all duration-300 ease-in-out z-20
                    md:w-64 md:translate-x-0 md:shadow-none
                    ${isSidebarOpen
                        ? 'w-72 translate-x-0 shadow-xl'
                        : 'w-72 -translate-x-full md:translate-x-0'}`}>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">Klasörler</h2>
                    <button
                        onClick={handleNewFolder}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 w-8 h-8 flex items-center justify-center text-indigo-600 dark:text-indigo-400 rounded-lg transition-colors">
                        <FontAwesomeIcon icon={faFolderPlus} />
                    </button>
                </div>

                <div className="space-y-2 mb-4">
                    <button
                        onClick={() => {
                            dispatch(setFilter('all'));
                            if (window.innerWidth < 768) setIsSidebarOpen(false);
                        }}
                        className={`flex items-center w-full p-2.5 rounded-lg transition-colors ${filter === 'all'
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}>
                        <FontAwesomeIcon icon={faLayerGroup} className="w-4 h-4" />
                        <span className="ml-2 flex-1">Tüm Notlar</span>
                        <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-md text-xs font-medium min-w-[1.5rem] text-center">
                            {notes.length}
                        </span>
                    </button>

                    <button
                        onClick={() => {
                            dispatch(setFilter('favorite'));
                            if (window.innerWidth < 768) setIsSidebarOpen(false);
                        }}
                        className={`flex items-center w-full p-2.5 rounded-lg transition-colors ${filter === 'favorite'
                            ? 'bg-yellow-200 text-black'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}>
                        <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
                        <span className="ml-2 flex-1">Favoriler</span>
                        <span className="bg-yellow-200 text-black px-2 py-0.5 rounded-md text-xs font-medium min-w-[1.5rem] text-center">
                            {favoriteNotes.length}
                        </span>
                    </button>
                </div>

                <div className="border-t border-b border-gray-200 dark:border-gray-600 py-4">
                    <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Oluşturulanlar
                    </h3>

                    <ul className="space-y-1">
                        {folders.length === 0 ? (
                            <li className="text-gray-400 dark:text-gray-500 text-sm px-2 py-3 text-center select-none">
                                Henüz oluşturduğunuz klasör yok.
                            </li>
                        ) : (
                            folders.map((folder) => (
                                <li key={folder.id} onClick={() => handleFolderSelect(folder)}
                                    className={`rounded-lg cursor-pointer transition-colors ${selectedFolder?.id === folder.id
                                        ? 'bg-gray-200 dark:bg-gray-700'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}>
                                    <div className="p-2 flex items-center">
                                        <span onClick={(e) => { e.stopPropagation(); setColorPickerId(folder.id) }}
                                            className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                            <FontAwesomeIcon icon={faFolder} className={`${iconColorClasses[folder.color]} text-base`} />
                                        </span>

                                        <div className="ml-2 flex-1 min-w-0 flex items-center">
                                            {editingFolderId === folder.id ? (
                                                <input autoFocus type="text" className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                                                    <span className="truncate text-sm text-gray-900 dark:text-white" title={folder.name}>
                                                        {folder.name}
                                                    </span>
                                                    <div className="ml-auto flex items-center gap-1.5">
                                                        <span className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded text-xs min-w-[1.25rem] text-center">
                                                            {getFolderNoteCount(folder.id)}
                                                        </span>
                                                        <button onClick={(e) => { e.stopPropagation(); setEditingFolderId(folder.id) }}
                                                            className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors">
                                                            <FontAwesomeIcon icon={faPen} className="w-3 h-3" />
                                                        </button>
                                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.id) }} className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded transition-colors">
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
                                                            ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 dark:ring-offset-gray-800'
                                                            : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 dark:hover:ring-gray-500 dark:hover:ring-offset-gray-800'
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
        </>
    );
}

export default Sidebar;