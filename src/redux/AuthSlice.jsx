import { supabase } from '../config/supabaseClient';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { translateSupabaseError } from '../utils/errorTranslator'; // HATA MESAJINI TÜRKÇEYE ÇEVİRMEK İÇİN

export const registerUser = createAsyncThunk('auth/registerUser', async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return rejectWithValue(error.message);
    return data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue, getState }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        const translatedMessage = translateSupabaseError(error.message);
        return rejectWithValue(translatedMessage);
    }
    return data;
});

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.href } });
    if (error) return rejectWithValue(error.message);
    return data;
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();
    if (error) return rejectWithValue(error.message);
    return null;
});

export const getSession = createAsyncThunk('auth/getSession', async (_, { rejectWithValue, getState }) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) return rejectWithValue(error.message);
    return data.session;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        session: null,
        loading: false,
        error: null,
        initialized: false,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setSession: (state, action) => {
            state.session = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.session = action.payload.session;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.session = action.payload.session;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.session = null;
            })
            .addCase(getSession.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.initialized = false;
            })
            .addCase(getSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.initialized = true;
            })
            .addCase(getSession.fulfilled, (state, action) => {
                state.loading = false;
                state.session = action.payload;
                state.initialized = true;
            })
    }
})

export const { clearError, setSession } = authSlice.actions;
export default authSlice.reducer;
