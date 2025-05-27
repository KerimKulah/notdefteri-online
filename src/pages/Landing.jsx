import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFolder, faShareAlt, faCloud, faSearch, faLock, faBars, faTimes, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDarkMode } from "../context/DarkModeContext";


const SCREENSHOTS = {
    concept: "https://i.hizliresim.com/t5el2kq.png", // Masaüstü+mobil birleştirilmiş konsept görselin URL'si
    texteditor: "https://i.ibb.co/Mxrcn5dq/texteditor.jpg",
    desktop: "https://i.hizliresim.com/3gr33cy.jpg",
    folderCustomization: "https://i.ibb.co/0RrfLpzd/klasoredit.png",
};

const features = [
    { icon: faEdit, title: "Gelişmiş Metin Editörü  ", desc: "Güçlü metin düzenleme aracımızla notlarınızı kolayca biçimlendirin." },
    { icon: faFolder, title: "Klasörlerle Organizasyon", desc: " Notlarınızı kategorilere ayırın ve renkli klasörlerle organize edin. İhtiyacınıza göre özelleştirin." },
    { icon: faShareAlt, title: "Kolay Paylaşım", desc: "Çalışma arkadaşlarınız veya arkadaşlarınızla notlarınızı kolayca paylaşın. Tek tıkla paylaşım bağlantısı oluşturun." },
    { icon: faCloud, title: "Bulut Senkronizasyonu", desc: "Notlarınıza her cihazdan erişin. Bilgisayarınız, tabletiniz veya telefonunuz - her zaman güncel kalır." },
    { icon: faSearch, title: "Hızlı Arama", desc: " Notlarınız arasında anında arama yapın ve ihtiyacınız olan bilgiye hızlıca ulaşın." },
    { icon: faLock, title: "Güvenli Depolama", desc: "Notlarınız Supabase üzerinde güvenle saklanır ve sadece size özel olarak korunur." }
];

const Landing = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalImg, setModalImg] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const { darkMode, toggleDarkMode } = useDarkMode();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSmoothScroll = (e, id) => {
        e.preventDefault();
        setMenuOpen(false); // Menüden tıklayınca kapansın
        const element = document.querySelector(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-b from-gray-100 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-800/80 shadow sticky top-0 z-40 backdrop-blur-sm transition-colors duration-300">
                <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4 relative">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <img
                                src="https://i.hizliresim.com/5laf03t.png"
                                alt="Logo"
                                className="w-12 h-12 transition transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-indigo-400 rounded-full blur opacity-10 transition-opacity -z-10"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 bg-clip-text transition-colors duration-300">
                                NOTDEFTERI
                            </span>
                            <span className="text-sm font-medium text-indigo-800 dark:text-indigo-400 tracking-wider transition-colors duration-300">
                                .ONLINE
                            </span>
                        </div>
                    </div>
                    {/* Hamburger (mobil) */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menüyü Aç/Kapat"
                    >
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-2xl text-indigo-700 dark:text-indigo-300" />
                    </button>
                    {/* Menü (masaüstü) */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-6">
                            <li>
                                <a
                                    href="#features"
                                    onClick={e => handleSmoothScroll(e, '#features')}
                                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1 rounded transition">
                                    Özellikler
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#screenshots"
                                    onClick={e => handleSmoothScroll(e, '#screenshots')}
                                    className="hover:scale-105 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1 rounded transition"
                                >
                                    Ekran Görüntüleri
                                </a>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="inline-block w-25 text-center px-4 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition font-medium"
                                >
                                    Giriş Yap
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="inline-block w-25 text-center px-4 py-1 rounded-lg bg-indigo-600 dark:bg-indigo-500 border border-indigo-600 dark:border-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition font-medium"
                                >
                                    Kayıt Ol
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={toggleDarkMode}
                                    className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition flex items-center gap-2">
                                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                                </button>
                            </li>
                        </ul>
                    </nav>
                    {/* Menü (mobil) */}
                    {menuOpen && (
                        <nav className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg rounded-b-xl md:hidden animate-fade-in z-50 transition-colors duration-300">
                            <ul className="flex flex-col items-center gap-2 py-4">
                                <li>
                                    <a
                                        href="#features"
                                        onClick={e => handleSmoothScroll(e, '#features')}
                                        className="block w-44 text-center text-base font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2 rounded-lg transition"
                                    >
                                        Özellikler
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#screenshots"
                                        onClick={e => handleSmoothScroll(e, '#screenshots')}
                                        className="block w-44 text-center text-base font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2 rounded-lg transition"
                                    >
                                        Ekran Görüntüleri
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="block w-44 text-center text-base font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition"
                                    >
                                        Giriş Yap
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="block w-44 text-center text-base font-medium bg-indigo-600 dark:bg-indigo-500 border border-indigo-600 dark:border-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
                                    >
                                        Kayıt Ol
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={toggleDarkMode}
                                        className="block w-44 text-center text-base font-medium border text-gray-700 dark:text-gray-200 border-gray-500 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                                        {darkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}
                                    </button>
                                </li>
                            </ul>
                        </nav>

                    )}
                </div>
            </header>

            {/* Hero Section */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-6xl mx-auto py-20 px-6 gap-16 relative z-10">
                {/* Enhanced Left Content */}
                <div className="flex-1 text-center lg:text-left space-y-8">
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            <span className="text-indigo-800 dark:text-indigo-200 transition-colors duration-300">
                                NOTLARINIZ HER
                            </span>
                            <br />
                            <span className="text-indigo-800 dark:text-indigo-200 transition-colors duration-300">
                                ZAMAN YANINIZDA
                            </span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-black dark:text-gray-200 max-w-2xl leading-relaxed transition-colors duration-300">
                            Notlarınızı düzenleyin, organize edin ve istediğiniz yerden erişin.
                            Klasörler oluşturun, notlarınızı paylaşın ve güvenle saklayın!
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/login" className="hover:scale-105 px-8 py-3 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 text-lg font-semibold shadow transition">
                            Ücretsiz Başlayın
                            <span className="group-hover:translate-x-1 transition-transform"> →</span>
                        </Link>
                    </div>
                </div>

                {/* Enhanced Right Image */}
                <div className="flex-1 flex justify-center items-center relative">
                    <div className="relative group ">
                        <img
                            src={SCREENSHOTS.concept}
                            alt="NotDefteri.online"
                            className="w-full max-w-lg lg:max-w-2xl lg:translate-x-8 transition-all duration-700 hover:scale-105 rounded-2xl"
                            style={{
                                filter: `drop-shadow(1px 5px 10px ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgb(45, 49, 167)'})`,
                                transform: `translateY(${scrollY * 0.1}px)`
                            }}
                        />
                        {/* Floating elements */}
                        <div className="hidden lg:block absolute top-10 -left-8 w-8 h-8 bg-indigo-400 dark:bg-indigo-300 rounded-full blur opacity-60 animate-bounce transition-colors duration-300" style={{ animationDelay: '2s' }}></div>
                        <div className="hidden lg:block absolute -top-4 right-16 w-12 h-12 bg-indigo-400 dark:bg-indigo-300 rounded-full blur opacity-60 animate-bounce -z-10 transition-colors duration-300" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="py-16 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-indigo-700 dark:text-indigo-300 font-bold mb-4 transition-colors duration-300">Özellikler</h2>
                    <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        Notdefteri.online, not tutmayı daha kolay ve verimli hale getiren birçok özellik sunar.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white dark:bg-gray-700 hover:scale-105 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:shadow-gray-900/20 transition-all duration-300 flex flex-col items-center text-center border dark:border-gray-600">
                            <div className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4 transition-colors duration-300">
                                <FontAwesomeIcon icon={f.icon} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-300">{f.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Screenshots Section */}
            <section id="screenshots" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-indigo-700 dark:text-indigo-300 font-bold mb-4 transition-colors duration-300">Ekran Görüntüleri</h2>
                    <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        Notdefteri.online'ın kullanıcı dostu arayüzünü keşfedin.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                    {[SCREENSHOTS.texteditor, SCREENSHOTS.desktop, SCREENSHOTS.folderCustomization].map((src, i) => (
                        <div
                            key={i}
                            className="flex-1 min-w-[220px] max-w-[340px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl dark:shadow-gray-900/30 transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-700 flex items-center justify-center cursor-pointer border dark:border-gray-600"
                            style={{ aspectRatio: "4/3", height: "auto", minHeight: 180 }}
                            onClick={() => setModalImg(src)}
                        >
                            <img
                                src={src}
                                alt=""
                                className="w-full h-full object-contain max-h-80"
                                style={{ background: darkMode ? "#374151" : "#f3f4f6" }}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal */}
            {modalImg && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-black/80 transition-colors duration-300"
                    onClick={() => setModalImg(null)}
                >
                    <img
                        src={modalImg}
                        alt=""
                        className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl border-4 border-white dark:border-gray-600"
                        style={{ background: darkMode ? "#374151" : "#f3f4f6" }}
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}

            {/* CTA Section */}
            <section className="bg-indigo-600 dark:bg-indigo-500 text-white py-16 px-4 text-center transition-colors duration-300">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Hemen Ücretsiz Deneyin</h2>
                <p className="text-lg max-w-2xl mx-auto mb-8 text-indigo-100">
                    Notdefteri.online ile daha düzenli ve verimli olun. Saniyeler içinde hesap oluşturun ve not tutmaya başlayın.
                </p>
                <Link to="/register" className="px-8 py-3 rounded-lg bg-white dark:bg-gray-100 text-indigo-700 dark:text-indigo-800 hover:bg-indigo-50 dark:hover:bg-gray-200 text-lg font-semibold shadow transition-colors duration-300">
                    Hemen Kayıt Ol
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-8 px-4 text-center text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
                <div className="flex flex-wrap justify-center gap-6 mb-4">
                    <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Hakkımızda</a>
                    <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Gizlilik Politikası</a>
                    <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Kullanım Şartları</a>
                    <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Yardım</a>
                    <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">İletişim</a>
                </div>
                <div className="border-t dark:border-gray-700 pt-4 text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">
                    &copy; {new Date().getFullYear()} NOTDEFTERI.ONLINE Tüm hakları saklıdır.
                </div>
            </footer>
        </div>
    );
};

export default Landing;