import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { translateSupabaseError } from '../utils/errorTranslator';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 8) {
            setError('Şifre en az 8 karakter olmalı.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        setLoading(false);
        if (error) {
            const translatedMessage = translateSupabaseError(error.message);
            setError(translatedMessage);
        } else {
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
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
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Şifreniz başarıyla değiştirildi!</h2>
                        <p className="text-md text-gray-700 mb-6">
                            Giriş sayfasına yönlendiriliyorsunuz...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Yeni Şifre Belirle</h2>
                    <div className="mt-3 text-sm text-gray-600">
                        Lütfen yeni şifrenizi girin.
                    </div>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre (Tekrar)</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {error && (
                            <div className="mt-2 text-sm text-red-600">{error}</div>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            {loading ? 'Kaydediliyor...' : 'Şifreyi Değiştir'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;