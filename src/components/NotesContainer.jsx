import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotes } from '../redux/NoteSlice';
import { useSelector } from 'react-redux';
import NoteCard from './NoteCard';


function NotesContainer() {
    const dispatch = useDispatch();
    const { notes, loading, error } = useSelector((state) => state.note);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch]);


    return (

        //NOT YOKSA HENÜZ BİR NOTUNUZ YOK HEMEN YENİ BİR NOT EKLEİYN GİBİ BİR
        // list viewde col-1 yap
        <div className="container mx-auto p-2"> {loading && <p>Yükleniyor...</p>} {error && <p className="text-red-500">Hata: {error}</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {notes?.map((note) => (
                    <NoteCard key={note.id} note={note} />
                ))}
            </div>
        </div>
    )
}

export default NotesContainer