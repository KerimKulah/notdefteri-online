import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../redux/NoteSlice';
import NoteCard from './NoteCard';

function NotesContainer({ onNoteClick }) {
    const dispatch = useDispatch();
    const { notes, loading, error } = useSelector((state) => state.note);
    const { selectedFolder, filter } = useSelector((state) => state.folder);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch]);

    let filteredNotes = notes;
    if (filter === 'favorite') {
        filteredNotes = notes.filter(note => note.is_favorite);
    } else if (filter === 'folder' && selectedFolder) {
        filteredNotes = notes.filter(note => note.folder_id === selectedFolder.id);
    }

    if (loading) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p>Yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <p className="text-red-500">Hata: {error}</p>
            </div>
        );
    }

    // BOŞ MESAJI FİLTREYE GÖRE
    if (!filteredNotes || filteredNotes.length === 0) {
        let emptyMsg = "Henüz bir notunuz yok. Hemen yeni bir not ekleyin!";
        if (filter === "favorite") {
            emptyMsg = "Favori bir notunuz yok.";
        } else if (filter === "folder" && selectedFolder) {
            emptyMsg = "Bu klasörde henüz bir notunuz yok.";
        }
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-gray-600">{emptyMsg}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredNotes.map((note) => (
                    note && note.id ? (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onClick={() => onNoteClick(note)}
                        />
                    ) : null
                ))}
            </div>
        </div>
    );
}

export default NotesContainer;