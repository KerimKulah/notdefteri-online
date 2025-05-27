import React from 'react'
import Headerr from '../components/Headerr'
import Sidebar from '../components/Sidebar'
import Footerr from '../components/Footerr'
import NotesContainer from '../components/NotesContainer'
import NoteModal from '../components/NoteModal'
import { useState } from 'react';

function Home() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const openEmptyModal = () => {
        setSelectedNote(null);
        setModalOpen(true);
    };

    const openEditModal = (note) => {
        setSelectedNote(note);
        setModalOpen(true);
    };


    const closeModal = () => {
        setModalOpen(false);
        setSelectedNote(null);
    };

    return (
        <div className='bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 min-h-screen flex flex-col'>

            <Headerr onAddNoteClick={openEmptyModal} onSearch={setSearchQuery} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex flex-grow">
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <div className="flex-grow">
                    <NotesContainer onNoteClick={openEditModal} searchQuery={searchQuery} />
                </div>
            </div>
            <Footerr />
            <NoteModal isOpen={isModalOpen} onClose={closeModal} note={selectedNote} />
        </div >
    )
}

export default Home