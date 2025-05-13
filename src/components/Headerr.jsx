import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faBookOpen, faCog, faMoon, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import NoteModal from './NoteModal';


function Headerr() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSearch, setShowSearch] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const toggleSearch = () => setShowSearch(!showSearch);
    const toggleSettings = () => setShowSettings(!showSettings);

    // Not ekleme modalını açma ve kapama işlemleri
    const [isModalOpen, setModalOpen] = useState(false);

    const openEmptyModal = () => {
        setModalOpen(true);
    };



    const closeNoteModal = () => {
        setModalOpen(false);
    };



    const toggleDarkMode = () => {
    };

    const searchNotes = (e) => {
        const query = e.target.value;
        console.log("Arama sorgusu:", query);
        // Arama işlemleri burada yapılır
    };


    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap(); // thunk içinde hata varsa yakalanır
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
                        onClick={openEmptyModal}
                        className="px-3 py-2 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2 transition-all">
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Not Ekle</span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={toggleSearch}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="text-gray-600"
                            />
                        </button>
                        {showSearch && (
                            <div className="absolute left-0 top-full mt-2 w-64 z-20">
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded-lg shadow-lg bg-white dark:bg-gray-700"
                                    placeholder="Not başlığı arayın..."
                                    onInput={searchNotes}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <h1 className="text-xl font-bold flex items-center">
                    <img
                        src="https://i.hizliresim.com/l2pn169.png"
                        alt="Logo"
                        className="w-10 h-10 mr-1" // burada boyutları ayarlıyoruz
                    />
                    <span>NOTDEFTERI.ONLINE</span>
                </h1>

                <div className="relative">
                    <button
                        onClick={toggleSettings}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
                        <FontAwesomeIcon
                            icon={faCog}
                            className="text-gray-600"
                        />
                    </button>

                    {showSettings && (
                        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-20 overflow-hidden animate__animated animate__fadeIn">
                            <button
                                onClick={toggleDarkMode}
                                className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-all"
                            >
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
                                className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-all"
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="mr-3 text-primary-500"
                                />
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

            <NoteModal isOpen={isModalOpen} onClose={closeNoteModal} />
        </>
    )
}

export default Headerr