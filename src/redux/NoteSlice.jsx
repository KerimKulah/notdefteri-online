import { supabase } from '../config/supabaseClient';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createNote = createAsyncThunk('note/createNote', async (noteData, { getState, rejectWithValue }) => {
    // Redux state'den kullanıcı bilgilerini alıyoruz
    const { auth } = getState();
    const userId = auth.session?.user.id;
    if (!userId) return rejectWithValue('Kullanıcı oturum açmamış1');

    const noteWithUserId = { ...noteData, user_id: userId };
    const { data, error } = await supabase.from('note').insert([noteWithUserId]).select();
    if (error) return rejectWithValue(error.message);
    return data;
});

export const getNotes = createAsyncThunk('note/getNotes', async (_, { getState, rejectWithValue }) => {
    // Redux state'den kullanıcı bilgilerini alıyoruz
    const { auth } = getState();
    const userId = auth.session?.user.id;
    if (!userId) return rejectWithValue('Kullanıcı oturum açmamış2');

    const { data, error } = await supabase.from('note').select('*').eq('user_id', userId).order('updated_at', { ascending: false });
    if (error) return rejectWithValue(error.message);
    return data;
});

// Eksik gibi?
export const updateNote = createAsyncThunk('note/updateNote', async ({ id, updates }, { rejectWithValue }) => {
    const { data, error } = await supabase.from('note').update(updates).eq('id', id).select().single();
    if (error) return rejectWithValue(error.message);
    return data;
});

export const deleteNote = createAsyncThunk('note/deleteNote', async (id, { rejectWithValue }) => {
    const { error } = await supabase.from('note').delete().eq('id', id).single();
    if (error) return rejectWithValue(error.message);
    return id;
});

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        notes: [],
        favoriteNotes: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload) && action.payload[0]) {
                    state.notes.unshift(action.payload[0]);
                }
            })
            .addCase(createNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(getNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload;
                state.favoriteNotes = action.payload.filter(note => note.is_favorite);
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.loading = false;
                const updatedNote = action.payload;
                if (updatedNote) {
                    const index = state.notes.findIndex(note => note.id === updatedNote.id);
                    if (index !== -1) state.notes[index] = updatedNote;
                    if (updatedNote.is_favorite) {
                        const favIndex = state.favoriteNotes.findIndex(note => note.id === updatedNote.id);
                        if (favIndex === -1) {
                            state.favoriteNotes.push(updatedNote);
                        } else {
                            state.favoriteNotes[favIndex] = updatedNote;
                        }
                    } else {
                        state.favoriteNotes = state.favoriteNotes.filter(note => note.id !== updatedNote.id);
                    }
                }
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = state.notes.filter(note => note.id !== action.payload);
                state.favoriteNotes = state.favoriteNotes.filter(note => note.id !== action.payload);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
    }
})

export const { clearError } = noteSlice.actions;
export default noteSlice.reducer;