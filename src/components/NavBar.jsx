import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faThLarge, faList } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
    return (

        <div className="bg-white shadow-sm mb-4 p-4">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-center">

                    {/* Folder info */}
                    <div className="flex items-center space-x-2 text-lg">
                        <span id="currentFolderIcon" className="text-cyan-600"><FontAwesomeIcon icon={faLayerGroup} /></span>
                        <span id="currentFolderName">Tüm Notlar</span>
                        <span id="currentFolderCount" className="text-sm text-gray-500">(0)</span>
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