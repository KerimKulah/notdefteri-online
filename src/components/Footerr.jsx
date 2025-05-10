import React from 'react'


function Footerr() {
    return (
        <div className="bg-white border-t border-gray-300 shadow-lg mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <div className="flex items-center text-lg font-bold mb-2">
                            <span>NOTDEFTERI.ONLINE</span>
                        </div>
                        <p className="text-sm text-gray-500 ">
                            Hızlı Notlar ve Kolay Paylaşım
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-center md:text-left">
                        <div>
                            <h3 className="font-semibold mb-2">Hakkında</h3>
                            <ul className="space-y-1 text-sm text-gray-500 ">
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Uygulama Hakkında</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">İletişim</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">SSS</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Güvenlik</h3>
                            <ul className="space-y-1 text-sm text-gray-500 ">
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Veri Koruma</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Şifreleme</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Yedekleme</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Destek Ol</h3>
                            <ul className="space-y-1 text-sm text-gray-500 ">
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Bağış Yap</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Premium</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Referans Ol</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-500  mb-2 md:mb-0">
                        &copy; 2025 Modern Notlar. Tüm hakları saklıdır.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footerr