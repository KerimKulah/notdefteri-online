const supabaseErrorTranslations = {
    "Invalid login credentials": "Kullanıcı adı veya şifre hatalı",

}


export function translateSupabaseError(message) {
    return supabaseErrorTranslations[message] || message;
}
