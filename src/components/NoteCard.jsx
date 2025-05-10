
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faClock } from '@fortawesome/free-solid-svg-icons';

function NoteCard({ note }) {

    //5 MAY tarzı bir tarih formatı için
    const formatDate = (dateString) => {
        const options = { month: 'short', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', options).replace(/\//g, '.');
    };

    const getHoursSinceUpdate = (dateString) => {
        const now = new Date();
        const updated = new Date(dateString);
        const diffHours = Math.floor((now - updated) / (1000 * 60 * 60));
        return diffHours;
    };

    return (
        <div className="h-full bg-white rounded-lg shadow p-4 pb-3 hover:shadow-lg hover:scale-105 duration-300 transition-all">
            <div className="flex justify-between items-start mb-2">
                <h5 className="font-bold text-gray-800 truncate pr-3">{note.title}</h5>
                <div className="text-blue-500 flex items-center text-xs whitespace-nowrap pt-1">
                    <FontAwesomeIcon icon={faCalendarDay} className="mr-1" />
                    <span>{formatDate(note.created_at)}</span>
                </div>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-4 min-h-[100px]">
                {note.content}
            </p>

            <div className="border-t pt-2 flex items-center text-gray-500 text-xs">
                <FontAwesomeIcon icon={faClock} className="mr-1" />
                <span>Updated {Math.floor(Math.random() * 24)} hours ago</span>
            </div>
        </div>
    );
}

export default NoteCard;