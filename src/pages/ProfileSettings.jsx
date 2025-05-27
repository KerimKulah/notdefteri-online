import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail, updatePassword, clearMessages } from '../redux/ProfileSlice';
import { Link } from 'react-router-dom';

// Gerekli ikonları import ediyoruz
function HomeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
    );
}

function SpinnerIcon() {
    return (
        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    );
}

function AlertIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
    );
}

function ProfileSettings() {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.profile);
    const session = useSelector(state => state.auth.session);

    const [emailForm, setEmailForm] = useState({
        email: '',
        password: ''
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Şifre eşleşme durumunu kontrol eden state
    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        // Şifre eşleşme kontrolü
        if (passwordForm.confirmPassword) {
            setPasswordMatch(passwordForm.newPassword === passwordForm.confirmPassword);
        }

        // Component unmount olduğunda mesajları temizle
        return () => {
            dispatch(clearMessages());
        };
    }, [dispatch, passwordForm.newPassword, passwordForm.confirmPassword]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateEmail(emailForm));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            return; // Form validation yapılacak
        }
        dispatch(updatePassword({
            currentPassword: passwordForm.currentPassword,
            newPassword: passwordForm.newPassword
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Profil Ayarları
                    </h1>
                    <Link
                        to="/home"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
                    >
                        <HomeIcon />
                        <span>Ana Sayfa</span>
                    </Link>
                </div>

                {/* Mevcut email bilgi kartı */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md mb-6 border-l-4 border-blue-500">
                    <div className="flex items-center text-gray-700 dark:text-gray-200">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Mevcut E-posta
                            </p>
                            <p className="font-medium">{session?.user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email değiştirme formu */}
                    <form onSubmit={handleEmailSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">
                            E-posta Değiştir
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Yeni E-posta Adresi
                                </label>
                                <input
                                    type="email"
                                    value={emailForm.email}
                                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="yeni@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Mevcut Şifre
                                </label>
                                <input
                                    type="password"
                                    value={emailForm.password}
                                    onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium shadow-md"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <SpinnerIcon />
                                        <span>İşleniyor...</span>
                                    </div>
                                ) : 'E-posta Güncelle'}
                            </button>
                        </div>
                    </form>

                    {/* Şifre değiştirme formu */}
                    <form onSubmit={handlePasswordSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">
                            Şifre Değiştir
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Mevcut Şifre
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Yeni Şifre
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Yeni Şifre (Tekrar)
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${passwordForm.confirmPassword && !passwordMatch
                                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-500'
                                        : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
                                        }`}
                                    placeholder="••••••••"
                                    required
                                />
                                {passwordForm.confirmPassword && !passwordMatch && (
                                    <p className="text-red-500 text-sm mt-1">Şifreler eşleşmiyor</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={loading || (passwordForm.confirmPassword && !passwordMatch)}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium shadow-md"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <SpinnerIcon />
                                        <span>İşleniyor...</span>
                                    </div>
                                ) : 'Şifre Güncelle'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Hata ve başarı mesajları */}
                {error && (
                    <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center border border-red-200 dark:border-red-800 shadow-sm">
                        <AlertIcon />
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center border border-green-200 dark:border-green-800 shadow-sm">
                        <CheckIcon />
                        <span>{success}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileSettings;