import { supabase } from '../config/supabaseClient';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const createNote = createAsyncThunk('note/createNote', async (noteData, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from('note')
            .insert(noteData);

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

// Kullanıcıya ait olan is_favorite true notları alır.
// const fetchFavoriteNotes = createAsyncThunk('note/fetchFavoriteNotes', async (_, { rejectWithValue }) => {
//     try {
//         const { data, error } = await supabase.from('note').select('*').eq('is_favorite', true);
//         if (error) throw error;
//         return data;
//     } catch (err) {
//         return rejectWithValue(err.message);
//     }
// });

// // Kullanıcının belli bir klasöründeki notları alır
// const fetchNotesByFolder = createAsyncThunk('note/fetchNotesByFolderId', async (folderId, { rejectWithValue }) => {
//     try {
//         const { data, error } = await supabase.from('note').select('*').eq('folder_id', folderId);
//         if (error) throw error;
//         return data;
//     } catch (err) {
//         return rejectWithValue(err.message);
//     }
// });

// // Kullanıcının notunu güncellemesini sağlar
// const updateNote = createAsyncThunk('note/updateNote', async ({ id, updates }, { rejectWithValue }) => {
//     try {
//         const { data, error } = await supabase.from('note').update(updates).eq('id', id);
//         if (error) throw error;
//         return data;
//     } catch (err) {
//         return rejectWithValue(err.message);
//     }
// });

// // Kullanıcının notunu silmesini sağlar
// const deleteNote = createAsyncThunk('note/deleteNote', async (id, { rejectWithValue }) => {
//     try {
//         const { data, error } = await supabase.from('note').delete().eq('id', id);
//         if (error) throw error;
//         return data;
//     } catch (err) {
//         return rejectWithValue(err.message);
//     }
// });

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        notes: [],
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
                state.notes.push(action.payload);
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
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export { createNote, getNotes };
export const { clearError } = noteSlice.actions;
export default noteSlice.reducer;