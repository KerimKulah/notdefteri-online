import React from 'react'
import Headerr from '../components/Headerr'
import Sidebar from '../components/Sidebar'
import Footerr from '../components/Footerr'
import NotesContainer from '../components/NotesContainer'
import NoteModal from '../components/NoteModal'
import { useState } from 'react';
import NavBar from '../components/NavBar'


function home() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null); // null ise yeni not

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
        <div className='bg-gray-50 text-gray-900s transition-all duration-300 min-h-screen flex flex-col'>
            <Headerr onAddNoteClick={openEmptyModal} />
            <div className="flex flex-grow">
                <Sidebar />
                {/* Main content */}
                <div className="flex-grow">
                    <NavBar />
                    <NotesContainer onNoteClick={openEditModal} />
                </div>
            </div>
            <Footerr />

            {/* Modal for creating/editing notes */}
            <NoteModal isOpen={isModalOpen} onClose={closeModal} note={selectedNote} />

        </div >

    )


}

export default home