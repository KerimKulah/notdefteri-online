import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faEnvelope,
    faQuestionCircle,
    faShieldHalved,
    faKey,
    faCloudArrowUp,
    faGift,
    faCrown,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';

function Footerr() {
    return (
        <div className="bg-white border-t border-gray-200 shadow-lg mt-auto">
            <div className="container-full mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="mb-4 md:mb-0 md:w-1/4">
                        <div className="flex items-center text-lg font-bold mb-2">
                            <span>NOTDEFTERI.ONLINE</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Hızlı Notlar ve Kolay Paylaşım
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold mb-2">Hakkında</h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>
                                    <a href="#" className="hover:text-cyan-600 transition-colors flex items-center gap-2">
                                        <FontAwesomeIcon icon={faCircleInfo} className="w-4 h-4" />
                                        <span>Uygulama Hakkında</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-cyan-600 transition-colors flex items-center gap-2">
                                        <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                                        <span>İletişim</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-cyan-600 transition-colors flex items-center gap-2">
                                        <FontAwesomeIcon icon={faQuestionCircle} className="w-4 h-4" />
                                        <span>SSS</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Güvenlik</h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>
                                    <a href="#" className="hover:text-cyan-600 transition-colors flex items-center gap-2">
                                        <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4" />
                                        <span>Veri Koruma</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-cyan-600 transition-colors flex items-center gap-2">
                                        <FontAwesomeIcon icon={faKey} className="w-4 h-4" />
                                        <span>Şifreleme</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-cyan-600 transition-colors flex items-center gap-2">
                                        <FontAwesomeIcon icon={faCloudArrowUp} className="w-4 h-4" />
                                        <span>Yedekleme</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Destek Ol</h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>
                                    <a href="#" className="hover:text-cyan-600 transition-colors flex items-center gap-2">
                                        <FontAwesomeIcon icon={faGift} className="w-4 h-4" />
                                        <span>Bağış Yap</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-cyan-600 transition-colors flex items-center gap-2">
                                        <FontAwesomeIcon icon={faCrown} className="w-4 h-4" />
                                        <span>Premium</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-cyan-600 transition-colors flex items-center gap-2">
                                        <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4" />
                                        <span>Referans Ol</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-500 mb-2 md:mb-0">
                        &copy; {new Date().getFullYear()} NOTDEFTERI.ONLINE Tüm hakları saklıdır.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footerr;