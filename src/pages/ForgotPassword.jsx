import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/AuthSlice';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Geçerli bir e-posta adresi giriniz';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        const emailValidationError = validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }
        const result = await dispatch(resetPassword({ email }));
        if (result.type.endsWith('fulfilled')) {
            setSuccess(true);
        }
    };

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg transition-all duration-300">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Şifre Sıfırlama E-postası Gönderildi!</h2>
                        <p className="text-md text-gray-700 mb-6">
                            <span className="font-semibold">{email}</span> adresine şifre sıfırlama bağlantısı gönderildi.
                        </p>
                        <Link
                            to="/login"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 block text-center"
                        >
                            Giriş Sayfasına Git
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Şifremi Unuttum</h2>
                    <div className="mt-3 text-sm text-gray-600">
                        Hesabınıza erişmek için e-posta adresinizi girin.
                    </div>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email adresiniz"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className={`block w-full pl-10 pr-3 py-2 border ${emailError ? 'border-red-300' : 'border-gray-300'
                                        } rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200`}
                                />
                            </div>
                            {emailError && (
                                <div className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {emailError}
                                </div>
                            )}
                        </div>
                    </div>
                    {error && (
                        <div className="p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {loading ? (
                                <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {loading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Linki Gönder'}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-xs text-center text-gray-500">
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Giriş Yap</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;