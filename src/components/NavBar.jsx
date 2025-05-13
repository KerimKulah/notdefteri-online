import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faThLarge, faList, faStar, faFolder } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const iconColorClasses = {
    red: 'text-red-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    yellow: 'text-yellow-400',
    gray: 'text-gray-500',
    purple: 'text-purple-500',
};

function NavBar() {
    const { selectedFolder, filter } = useSelector((state) => state.folder);

    // İkonu filtreye göre seç
    let icon = faLayerGroup;
    let iconClass = "text-cyan-600";
    if (filter === "favorite") {
        icon = faStar;
        iconClass = "text-yellow-500";
    } else if (filter === "folder" && selectedFolder) {
        icon = faFolder;
        iconClass = iconColorClasses[selectedFolder.color] || "text-gray-500";
    }



    return (
        <div className="bg-white shadow-sm mb-4 p-4">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-center">

                    <div className="flex items-center space-x-2 text-lg">
                        <span id="currentFolderIcon" className={iconClass}>
                            <FontAwesomeIcon icon={icon} />
                        </span>
                        <span id="currentFolderName">
                            {filter === 'favorite'
                                ? "Favoriler"
                                : selectedFolder
                                    ? selectedFolder.name
                                    : "Tüm Notlar"}
                        </span>
                        <span id="currentFolderCount" className="text-sm text-gray-500">
                            {/* Not sayısı eklemek istersen buraya */}
                        </span>
                    </div>

                    {/* View buttons */}
                    <div className="flex">
                        <button id="gridViewBtn" className="p-2 rounded-l-md bg-gray-100 hover:bg-gray-200 transition-all border-gray-300">
                            <FontAwesomeIcon icon={faThLarge} className="text-gray-600" />
                        </button>
                        <button id="listViewBtn" className="p-2 rounded-r-md bg-gray-100 hover:bg-gray-200 transition-all">
                            <FontAwesomeIcon icon={faList} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar