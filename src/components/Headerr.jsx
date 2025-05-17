import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faCog, faMoon, faUser, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Headerr({ onAddNoteClick, onSearch, isSidebarOpen, setIsSidebarOpen }) {
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
            <div className="sticky top-0 z-30 flex items-center justify-between p-4 md:p-4 bg-white shadow-md">
                <div className="flex items-center space-x-2">
                    <button
                        className="md:hidden mr-2 py-1 px-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        aria-label="Menüyü Aç/Kapat">
                        <FontAwesomeIcon icon={faBars} className="text-xl text-indigo-600" />
                    </button>
                    <button
                        onClick={onAddNoteClick}
                        className="px-2 py-2  md:px-3 md:py-2 rounded-lg bg-indigo-600 hover:bg-indigo-800 text-white flex items-center gap-1 md:gap-2 transition-all">
                        <FontAwesomeIcon icon={faPlus} className="md:text-base text-s" />
                        <span className="hidden md:inline">Not Ekle</span>
                    </button>
                    <div className="relative">
                        <button
                            onClick={toggleSearch}
                            className="p-1.5 md:p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="text-black md:text-base text-s"
                            />
                        </button>
                        {showSearch && (
                            <div className="absolute left-0 md:left-full top-full md:top-0 mt-1 md:mt-0 md:ml-2 w-64 md:w-72 z-20">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-1 md:px-4 md:py-2 rounded-xl bg-white/60 backdrop-blur-md shadow-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent md:text-base text-sm"
                                        placeholder="Not arayın..."
                                        onInput={searchNotes}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <h1 className="text-sm md:text-xl font-bold flex items-center">
                    <img
                        src="https://i.hizliresim.com/5laf03t.png"
                        alt="Logo"
                        className="w-7 h-7 mr-1" />
                    <span>NOTDEFTERI.ONLINE</span>
                </h1>

                <div className="relative">
                    <button
                        onClick={toggleSettings}
                        className="p-1.5 md:p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all">
                        <FontAwesomeIcon
                            icon={faCog}
                            className="text-black md:text-base text-s"
                        />
                    </button>

                    {showSettings && (
                        <div className="absolute right-0 mt-1 w-48 md:w-56 bg-white shadow-lg rounded-lg z-20 overflow-hidden">
                            <button
                                onClick={toggleDarkMode}
                                className="flex items-center w-full text-left py-1 px-2 md:px-4 md:py-3 hover:bg-gray-100 transition-all text-sm md:text-base">
                                <FontAwesomeIcon
                                    icon={faMoon}
                                    className="mr-2 md:mr-3 text-primary-500 md:text-base text-xs"
                                />
                                <span>Karanlık Mod</span>
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/profile');
                                    setShowSettings(false);
                                }}
                                className="flex items-center w-full text-left px-3 py-2 md:px-4 md:py-3 hover:bg-gray-100 transition-all text-sm md:text-base">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="mr-2 md:mr-3 text-primary-500 md:text-base text-xs"
                                />
                                <span>Profil Ayarları</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full text-left px-3 py-2 md:px-4 md:py-3 hover:bg-gray-100 transition-all border-t text-sm md:text-base">
                                <FontAwesomeIcon
                                    icon={faSignOutAlt}
                                    className="mr-2 md:mr-3 text-red-500 md:text-base text-xs"
                                />
                                <span>Çıkış Yap</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Headerr;