import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faBookOpen, faCog, faMoon, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Headerr({ onAddNoteClick, onSearch }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSearch, setShowSearch] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const toggleSearch = () => setShowSearch(!showSearch);
    const toggleSettings = () => setShowSettings(!showSettings);
    const toggleDarkMode = () => { };

    useEffect(() => {
        if (!showSearch) {
            if (onSearch) onSearch('');
            return;
        }
    }, [showSearch, onSearch]);

    const searchNotes = (e) => {
        const query = e.target.value;
        if (onSearch) onSearch(query);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate('/login');
        } catch (error) {
            console.error('Çıkış yaparken hata oluştu:', error.message);
        }
    };

    return (
        <>
            <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white shadow-md">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={onAddNoteClick}
                        className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-800 text-white flex items-center gap-2 transition-all">
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Not Ekle</span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={toggleSearch}
                            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="text-gray-600"
                            />
                        </button>
                        {showSearch && (
                            <div className="absolute left-full top-0 ml-2 w-72 z-20">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-xl bg-white/60 backdrop-blur-md shadow-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-300"
                                        placeholder="Not arayın..."
                                        onInput={searchNotes}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <h1 className="text-xl font-bold flex items-center">
                    <img
                        src="https://i.hizliresim.com/l2pn169.png"
                        alt="Logo"
                        className="w-10 h-10 mr-1" />
                    <span>NOTDEFTERI.ONLINE</span>
                </h1>

                <div className="relative">

                    <button
                        onClick={toggleSettings}
                        className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all">
                        <FontAwesomeIcon
                            icon={faCog}
                            className="text-gray-600" />
                    </button>

                    {showSettings && (
                        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-20 overflow-hidden animate__animated animate__fadeIn">
                            <button
                                onClick={toggleDarkMode}
                                className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-all">
                                <FontAwesomeIcon
                                    icon={faMoon}
                                    className="mr-3 text-primary-500"
                                />
                                <span>Karanlık Mod</span>
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/profile');
                                    setShowSettings(false);
                                }}
                                className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-all">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="mr-3 text-primary-500" />
                                <span>Profil Ayarları</span>
                            </button>
                            <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-all border-t ">
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-red-500" />
                                <span>Çıkış Yap</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Headerr