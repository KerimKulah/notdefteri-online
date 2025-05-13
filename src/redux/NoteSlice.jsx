import { supabase } from '../config/supabaseClient';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const createNote = createAsyncThunk('note/createNote', async (noteData, { getState, rejectWithValue }) => {
    try {
        const { auth } = getState();
        const userId = auth.user?.id;

        if (!userId) {
            return rejectWithValue('User not authenticated');
        }

        const noteWithUserId = {
            ...noteData,
            user_id: userId,
        };

        const { data, error } = await supabase
            .from('note')
            .insert([noteWithUserId])
            .select();
        if (error) {
            return rejectWithValue(error.message);
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const getNotes = createAsyncThunk('note/getNotes', async (_, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from('note')
            .select('*');
        if (error) {
            return rejectWithValue(error.message);
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const updateNote = createAsyncThunk('note/updateNote', async ({ id, updates }, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from('note')
            .update(updates)
            .eq('id', id)
            .select();
        if (error) {
            return rejectWithValue(error.message);
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const deleteNote = createAsyncThunk('note/deleteNote', async (id, { rejectWithValue }) => {
    try {
        const { error } = await supabase
            .from('note')
            .delete()
            .eq('id', id);
        if (error) {
            return rejectWithValue(error.message);
        }
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
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
                state.error = action.payload;
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
                state.error = action.payload;
            })
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.loading = false;
                const updatedNote = action.payload[0];
                if (updatedNote) {
                    const index = state.notes.findIndex(note => note.id === updatedNote.id);
                    if (index !== -1) {
                        state.notes[index] = updatedNote;
                    }
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
                state.error = action.payload;
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
                state.error = action.payload;
            })
    }
})

export { createNote, getNotes, updateNote, deleteNote };
export const { clearError } = noteSlice.actions;
export default noteSlice.reducer;