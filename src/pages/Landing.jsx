import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFolder, faShareAlt, faCloud, faSearch, faLock, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';

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
        <div className="h-full flex flex-col bg-gradient-to-b from-gray-100 via-white to-white">            {/* Header */}
            <header className="bg-white/80 shadow sticky top-0 z-40">
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
                            <span className="text-2xl font-bold text-indigo-800 bg-clip-text">
                                NOTDEFTERI
                            </span>
                            <span className="text-sm font-medium text-indigo-500 tracking-wider">
                                .ONLINE
                            </span>
                        </div>
                    </div>
                    {/* Hamburger (mobil) */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-indigo-50 transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menüyü Aç/Kapat"
                    >
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-2xl text-indigo-700" />
                    </button>
                    {/* Menü (masaüstü) */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-6">
                            <li>
                                <a
                                    href="#features"
                                    onClick={e => handleSmoothScroll(e, '#features')}
                                    className="text-gray-700 hover:text-indigo-600 px-2 py-1 rounded transition">
                                    Özellikler
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#screenshots"
                                    onClick={e => handleSmoothScroll(e, '#screenshots')}
                                    className="hover:scale-105 text-gray-700 hover:text-indigo-600 px-2 py-1 rounded transition"
                                >
                                    Ekran Görüntüleri
                                </a>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="inline-block w-25 text-center px-4 py-1 rounded-lg text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition font-medium"
                                >
                                    Giriş Yap
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="inline-block w-25 text-center px-4 py-1 rounded-lg bg-indigo-600  border border-indigo-600 text-white hover:bg-indigo-700 transition font-medium"
                                >
                                    Kayıt Ol
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* Menü (mobil) */}
                    {menuOpen && (
                        <nav className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-xl md:hidden animate-fade-in z-50">
                            <ul className="flex flex-col items-center gap-2 py-4">
                                <li>
                                    <a
                                        href="#features"
                                        onClick={e => handleSmoothScroll(e, '#features')}
                                        className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded transition block"
                                    >
                                        Özellikler
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#screenshots"
                                        onClick={e => handleSmoothScroll(e, '#screenshots')}
                                        className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded transition block"
                                    >
                                        Ekran Görüntüleri
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="inline-block w-28 text-center px-2 py-1 rounded-lg text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition font-medium"
                                    >
                                        Giriş Yap
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="inline-block w-28 border border-indigo-600 text-center px-2 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium"
                                    >
                                        Kayıt Ol
                                    </Link>
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
                            <span className="text-indigo-800">
                                NOTLARINIZ HER
                            </span>
                            <br />
                            <span className="text-indigo-800 ">
                                ZAMAN YANINIZDA
                            </span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-black max-w-2xl leading-relaxed">
                            Notlarınızı düzenleyin, organize edin ve istediğiniz yerden erişin.
                            Klasörler oluşturun, notlarınızı paylaşın ve güvenle saklayın!
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/login" className="hover:scale-105 px-8 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-lg font-semibold shadow transition">
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
                            className="lg:translate-x-14 w-full max-w-2xl transition-all duration-700 hover:scale-105 rounded-2xl"
                            style={{
                                filter: 'drop-shadow(1px 5px 10px rgb(45, 49, 167))',
                                transform: `translateY(${scrollY * 0.1}px)`
                            }}
                        />
                        {/* Floating elements */}
                        <div className="hidden lg:block absolute top-79 -left-130 w-10 h-10 bg-indigo-400 rounded-full blur opacity-80 animate-bounce" style={{ animationDelay: '2s' }}></div>
                        <div className="hidden lg:block absolute -top-13 right-20 w-16 h-16 bg-indigo-400 rounded-full blur opacity-80 animate-bounce -z-10" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="py-16 px-4 bg-white">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-indigo-700 font-bold mb-4">Özellikler</h2>
                    <p className="text-lg max-w-2xl mx-auto text-gray-600">
                        Notdefteri.online, not tutmayı daha kolay ve verimli hale getiren birçok özellik sunar.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white hover:scale-105 rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center text-center">
                            <div className="text-4xl text-indigo-600 mb-4">
                                <FontAwesomeIcon icon={f.icon} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                            <p className="text-gray-700">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Screenshots Section */}
            <section id="screenshots" className="py-16 px-4 bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-indigo-700 font-bold mb-4">Ekran Görüntüleri</h2>
                    <p className="text-lg max-w-2xl mx-auto text-gray-600">
                        Notdefteri.online'ın kullanıcı dostu arayüzünü keşfedin.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                    {[SCREENSHOTS.texteditor, SCREENSHOTS.desktop, SCREENSHOTS.folderCustomization].map((src, i) => (
                        <div
                            key={i}
                            className="flex-1 min-w-[220px] max-w-[340px] rounded-xl overflow-hidden shadow-lg  hover:shadow-xl transition hover:scale-105 bg-white flex items-center justify-center cursor-pointer"
                            style={{ aspectRatio: "4/3", height: "auto", minHeight: 180 }}
                            onClick={() => setModalImg(src)}
                        >
                            <img
                                src={src}
                                alt=""
                                className="w-full h-full object-contain max-h-80"
                                style={{ background: "#f3f4f6" }}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal */}
            {modalImg && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                    onClick={() => setModalImg(null)}
                >
                    <img
                        src={modalImg}
                        alt=""
                        className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl border-4 border-white"
                        style={{ background: "#f3f4f6" }}
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}

            {/* CTA Section */}
            <section className="bg-indigo-600 text-white py-16 px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Hemen Ücretsiz Deneyin</h2>
                <p className="text-lg max-w-2xl mx-auto mb-8">
                    Notdefteri.online ile daha düzenli ve verimli olun. Saniyeler içinde hesap oluşturun ve not tutmaya başlayın.
                </p>
                <Link to="/register" className="px-8 py-3 rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 text-lg font-semibold shadow transition">
                    Hemen Kayıt Ol
                </Link>
            </section>



            {/* Footer */}
            <footer className="bg-white border-t py-8 px-4 text-center text-gray-500 text-sm">
                <div className="flex flex-wrap justify-center gap-6 mb-4">
                    <a href="#" className="hover:text-indigo-600 transition">Hakkımızda</a>
                    <a href="#" className="hover:text-indigo-600 transition">Gizlilik Politikası</a>
                    <a href="#" className="hover:text-indigo-600 transition">Kullanım Şartları</a>
                    <a href="#" className="hover:text-indigo-600 transition">Yardım</a>
                    <a href="#" className="hover:text-indigo-600 transition">İletişim</a>
                </div>
                <div className="border-t pt-4 text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} NOTDEFTERI.ONLINE Tüm hakları saklıdır.
                </div>
            </footer>
        </div>
    );
};

export default Landing;