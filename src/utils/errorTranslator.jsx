const supabaseErrorTranslations = {
    "Invalid login credentials": "Kullanıcı adı veya şifre hatalı",
    "Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789.": "Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir.",
}


export function translateSupabaseError(message) {
    return supabaseErrorTranslations[message] || message;
}
