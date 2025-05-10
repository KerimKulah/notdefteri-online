import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Kullanıcı oturumunu kontrol etme
// Bu fonksiyon, kullanıcı oturumunu kontrol eder ve oturum bilgilerini konsola yazdırır.
// Daha sonra silinebilir.

const checkSession = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (session) {
        console.log('Kullanıcı oturumu:', session);
    } else {
        console.log('Kullanıcı oturumu yok.');
    }
};

checkSession();

