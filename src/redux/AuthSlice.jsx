import { supabase } from '../config/supabaseClient';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const registerUser = createAsyncThunk('auth/registerUser', async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        throw new Error(error.message);
    }
    return data;
})

const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        throw new Error(error.message);
    }
    return data;
})

const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
    return null;
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            });
    }
});

export { registerUser, loginUser, logoutUser };
export default authSlice.reducer;
