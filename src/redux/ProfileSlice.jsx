import { supabase } from '../config/supabaseClient';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Email değiştirme
export const updateEmail = createAsyncThunk('profile/updateEmail', async ({ email, password }, { getState, rejectWithValue }) => {

    // Önce maili alalım
    const { auth } = getState();
    const user = auth.session?.user;
    if (!user) return rejectWithValue('Kullanıcı oturum açmamış.');
    const currentEmail = user.email;

    // şifreyi doğrula
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: currentEmail, password });
    if (signInError) return rejectWithValue('Mevcut şifre yanlış');

    // Email güncelle
    const { error: updateError } = await supabase.auth.updateUser({ email: email });
    if (updateError) return rejectWithValue(updateError.message);
    return { email, message: 'E-posta başarıyla güncellendi. Lütfen onayla.' };
});

// Şifre değiştirme
export const updatePassword = createAsyncThunk('profile/updatePassword', async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {

    // Önce maili alalım
    const { auth } = getState();
    console.log("getState().auth", getState().auth);
    const user = auth.session?.user;
    if (!user) return rejectWithValue('Kullanıcı oturum açmamış.');
    const currentEmail = user.email;

    // Önce mevcut şifreyi doğrula
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: currentEmail, password: currentPassword });
    if (signInError) return rejectWithValue('Mevcut şifre yanlış');

    // Şifreyi güncelle
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    if (updateError) return rejectWithValue(updateError.message);
    return true;
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        loading: false,
        error: null,
        success: null
    },
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.success = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(updateEmail.fulfilled, (state) => {
                state.loading = false;
                state.success = 'Lütfen e-posta adresinize gelen onay bağlantısınaa tıklayarak işlemi tamamlayın.';

            })
            .addCase(updateEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
                state.success = 'Şifre başarıyla güncellendi';
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

export const { clearMessages } = profileSlice.actions;
export default profileSlice.reducer;