import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faLayerGroup, faStar, faFolder } from '@fortawesome/free-solid-svg-icons'

function sidebar() {
    const [isModalOpen, setModalOpen] = useState(false);

    const newFolderModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const filterNotes = (filter) => {
        console.log("Filtre:", filter);
    };

    return (
        <>
            <aside id="folderSidebar" className="w-64 bg-white shadow-md transition-all p-4 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">Klasörler</h2>
                    <button onClick={newFolderModal} className="text-cyan-600 hover:text-cyan-700 transition-all">
                        <FontAwesomeIcon icon={faFolderPlus} />
                    </button>
                </div>
                <div className="mb-4">
                    <button
                        onClick={() => filterNotes("all")}
                        className="filter-btn flex items-center space-x-2 w-full p-2 rounded-lg mb-2 bg-cyan-100 text-cyan-700 hover:bg-cyan-200 transition-all">
                        <FontAwesomeIcon icon={faLayerGroup} />
                        <span>Tüm Notlar</span>
                        <span id="allNotesCount" className="ml-auto bg-cyan-400 text-cyan-1000 px-2 py-0.5 rounded-full text-xs">
                            0
                        </span>
                    </button>
                    <button
                        onClick={() => filterNotes("favorite")}
                        className="filter-btn flex items-center space-x-2 w-full p-2 rounded-lg mb-2 bg-yellow-100  text-yellow-700  hover:bg-yellow-200 transition-all">
                        <FontAwesomeIcon icon={faStar} />
                        <span>Favoriler</span>
                        <span id="favoritesCount" className="ml-auto bg-yellow-200  text-yellow-700 px-2 py-0.5 rounded-full text-xs">
                            0
                        </span>
                    </button>
                </div>

                <div className="border-t border-b border-gray-200 pb-4 pt-4">
                    <h3 className="text-sm text-gray-500 mb-2 uppercase">Klasörlerim</h3>
                    <ul id="foldersList" className="space-y-1">
                        {[
                            { name: "İş", icon: faFolder, color: "text-blue-500", key: "is" },
                            { name: "Kişisel", icon: faFolder, color: "text-green-500", key: "kisisel" },
                            { name: "Fikirler", icon: faFolder, color: "text-yellow-500", key: "fikirler" },
                            { name: "Alışveriş", icon: faFolder, color: "text-purple-500", key: "alisveris" },
                        ].map(folder => (
                            <li
                                key={folder.key}
                                className="folder-item flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
                                data-folder={folder.key}
                            >
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={folder.icon} className={`${folder.color} mr-2`} />
                                    <span>{folder.name}</span>
                                </div>
                                <span className="folder-count bg-gray-200 px-2 py-0.5 rounded-full text-xs">
                                    0
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Yeni Klasör Ekle</h2>
                        <button onClick={closeModal}>Kapat</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default sidebar