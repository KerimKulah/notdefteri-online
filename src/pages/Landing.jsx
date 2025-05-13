// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setGuestMode } from '../redux/AuthSlice'; // <-- ekle

// function Landing() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const startGuestMode = () => {
//         dispatch(setGuestMode(true));
//         navigate('/'); // Guest modda ana sayfaya yönlendir
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600">
//             <div className="container mx-auto px-4 py-16">
//                 <div className="max-w-4xl mx-auto text-center text-white">
//                     <h1 className="text-5xl font-bold mb-6">
//                         Notlarınızı Her Yerden Yönetin
//                     </h1>
//                     <p className="text-xl mb-12 text-cyan-100">
//                         Hızlı, güvenli ve kullanımı kolay not alma uygulaması
//                     </p>

//                     <div className="grid md:grid-cols-2 gap-8 mb-12">
//                         <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
//                             <h2 className="text-2xl font-semibold mb-4">Üye Olun</h2>
//                             <ul className="text-left space-y-3 mb-6">
//                                 <li className="flex items-center">
//                                     <span className="mr-2">✓</span> Sınırsız not oluşturma
//                                 </li>
//                                 <li className="flex items-center">
//                                     <span className="mr-2">✓</span> Klasör organizasyonu
//                                 </li>
//                                 <li className="flex items-center">
//                                     <span className="mr-2">✓</span> Not paylaşımı
//                                 </li>
//                                 <li className="flex items-center">
//                                     <span className="mr-2">✓</span> Notlarınızı her cihazda görün
//                                 </li>
//                             </ul>
//                             <button
//                                 onClick={() => navigate('/register')}
//                                 className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
//                             >
//                                 Ücretsiz Üye Ol
//                             </button>
//                         </div>

//                         <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
//                             <h2 className="text-2xl font-semibold mb-4">Hemen Deneyin</h2>
//                             <ul className="text-left space-y-3 mb-6">
//                                 <li className="flex items-center">
//                                     <span className="mr-2">✓</span> Üyelik gerektirmez
//                                 </li>
//                                 <li className="flex items-center">
//                                     <span className="mr-2">✓</span> 3 nota kadar ücretsiz
//                                 </li>
//                                 <li className="flex items-center">
//                                     <span className="mr-2">✓</span> Temel özellikler
//                                 </li>
//                                 <li className="flex items-center">
//                                     <span className="mr-2">⚠️</span> Notlar tarayıcıda saklanır
//                                 </li>
//                             </ul>
//                             <button
//                                 onClick={startGuestMode}
//                                 className="w-full bg-transparent border-2 border-white text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
//                             >
//                                 Misafir Olarak Dene
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Landing