import { supabase } from '../config/supabaseClient';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Email değiştirme
export const updateEmail = createAsyncThunk(
    'profile/updateEmail',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // Kullanıcıyı çek
            const { data, error: userError } = await supabase.auth.getUser();
            if (userError) throw new Error('Kullanıcı alınamadı');
            const currentEmail = data.user.email;

            // Önce şifreyi doğrula
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: currentEmail,
                password
            });

            if (signInError) throw new Error('Mevcut şifre yanlış');

            // Email güncelle
            const { error: updateError } = await supabase.auth.updateUser({
                email: email
            });

            if (updateError) throw new Error(updateError.message);

            return { email };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Şifre değiştirme
export const updatePassword = createAsyncThunk(
    'profile/updatePassword',
    async ({ currentPassword, newPassword }, { rejectWithValue }) => {
        try {
            // Kullanıcıyı çek
            const { data, error: userError } = await supabase.auth.getUser();
            if (userError) throw new Error('Kullanıcı alınamadı');
            const currentEmail = data.user.email;

            // Önce mevcut şifreyi doğrula
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: currentEmail,
                password: currentPassword
            });

            if (signInError) throw new Error('Mevcut şifre yanlış');

            // Şifreyi güncelle
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (updateError) throw new Error(updateError.message);

            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
                state.success = 'Lütfen hem eski hem de yeni e-posta adresinize gelen onay bağlantılarına tıklayarak işlemi tamamlayın.';

            })
            .addCase(updateEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
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
                state.error = action.payload;
            });
    }
});

export const { clearMessages } = profileSlice.actions;
export default profileSlice.reducer;