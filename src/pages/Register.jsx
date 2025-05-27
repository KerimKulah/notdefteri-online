import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, loginWithGoogle } from '../redux/AuthSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const { loading, error, session } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    useEffect(() => { if (session) { setRegistrationSuccess(true); } }, [session]);

    // Şifre doğrulama fonksiyonu
    const validatePassword = (password) => {
        if (password.length < 8) return 'Şifre en az 8 karakter olmalıdır';
        if (!/[A-Z]/.test(password)) return 'Şifre en az bir büyük harf içermelidir';
        if (!/[0-9]/.test(password)) return 'Şifre en az bir rakam içermelidir';
        return '';
    };

    // E-posta doğrulama fonksiyonu
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Geçerli bir e-posta adresi giriniz';
        return '';
    };

    const handleGoogleLogin = async () => {
        await dispatch(loginWithGoogle());
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // İlgili alanların hata durumlarını temizle
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordError('');
        }
        if (name === 'email') {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form doğrulama
        const emailValidationError = validateEmail(form.email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        const passwordValidationError = validatePassword(form.password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        if (form.password !== form.confirmPassword) {
            setPasswordError('Şifreler eşleşmiyor');
            return;
        }

        const { confirmPassword, ...registerData } = form;


        // Supabase ile kullanıcı kaydı ve manual mail kontrolu
        const result = await dispatch(registerUser(registerData));

        if (result.type.endsWith('rejected')) {
            setEmailError(result.payload || 'Kayıt sırasında bir hata oluştu');
            return;
        }

        const user = result.payload?.user;
        const session = result.payload?.session;

        // Yeni davranış: user var ama identities boşsa email zaten kayıtlı
        if (user && Array.isArray(user.identities) && user.identities.length === 0) {
            setEmailError('Bu e-posta adresi zaten kayıtlı');
            return;
        }

        // Eski davranış: user ve session null ise aynı şekilde hata ver
        if (user === null && session === null) {
            setEmailError('Bu e-posta adresi zaten kayıtlı');
            return;
        }

        setRegistrationSuccess(true);
    };

    if (registrationSuccess) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Kayıt Başarılı!</h2>
                        <div className="flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <p className="text-md text-gray-700 dark:text-gray-300">Lütfen <span className="font-semibold">{form.email}</span> adresine gönderilen e-postadan hesabınızı onaylayın.</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">E-posta onayından sonra hesabınıza giriş yapabilirsiniz.</p>

                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-800"
                            >
                                Giriş Sayfasına Git
                            </button>

                            <button
                                onClick={() => setRegistrationSuccess(false)}
                                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-800"
                            >
                                Geri Dön
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Kayıt Ol</h2>
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        Zaten hesabınız var mı?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200">
                            Giriş Yap
                        </Link>
                    </div>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email adresiniz"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-2 border ${emailError ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                                        } dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-colors duration-200`}
                                />
                            </div>
                            {emailError && (
                                <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {emailError}
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Şifre
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="Şifreniz"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-10 py-2 border ${passwordError ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                                        } dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-colors duration-200`}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none">
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Şifre en az 8 karakter, 1 büyük harf ve 1 rakam içermelidir.
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Şifre Tekrar
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    placeholder="Şifrenizi tekrar giriniz"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-10 py-2 border ${passwordError ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                                        } dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-colors duration-200`} />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none">
                                        {showConfirmPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            {passwordError && (
                                <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {passwordError}
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <div>
                        <button type="submit" disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                            {loading ? (
                                <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                        </button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Veya</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-800 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google ile Giriş Yap
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
                        Kayıt olarak, <Link to="/terms" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">Kullanım Şartları</Link> ve <Link to="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">Gizlilik Politikası</Link>nı kabul etmiş olursunuz.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;