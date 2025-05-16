import { supabase } from '../config/supabaseClient';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// id göndermeye gerek var mı? kontrol et

export const newFolder = createAsyncThunk('folder/newFolder', async (folderData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const userId = auth.session.user.id;
    if (!userId) return rejectWithValue('Kullanıcı oturum açmamış.');

    const folderWithUserId = { ...folderData, user_id: userId };
    const { data, error } = await supabase.from('folder').insert([folderWithUserId]).select();

    if (error) return rejectWithValue(error.message);
    return data;
});

export const getFolders = createAsyncThunk('folder/getFolders', async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.from('folder').select('*');
    if (error) return rejectWithValue(error.message);
    return data;
});

export const updateFolder = createAsyncThunk('folder/updateFolder', async ({ id, updates }, { rejectWithValue }) => {
    const { data, error } = await supabase.from('folder').update(updates).eq('id', id).select();
    if (error) return rejectWithValue(error.message);
    return data;
});

export const deleteFolder = createAsyncThunk('folder/deleteFolder', async (id, { rejectWithValue }) => {
    // Önce bu klasöre bağlı notların folder_id'sini null yap
    const { error: noteUpdateError } = await supabase.from('note').update({ folder_id: null }).eq('folder_id', id);
    if (noteUpdateError) return rejectWithValue(noteUpdateError.message);

    // Sonra klasörü sil
    const { error } = await supabase.from('folder').delete().eq('id', id);
    if (error) return rejectWithValue(error.message);
    return id;
});

const folderSlice = createSlice({
    name: 'folder',
    initialState: {
        folders: [],
        selectedFolder: null,
        filter: 'all',
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setSelectedFolder: (state, action) => {
            state.selectedFolder = action.payload;
            state.filter = action.payload ? 'folder' : 'all';
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
            if (action.payload !== 'folder') state.selectedFolder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(newFolder.pending, (state) => {
                state.loading = true;
            })
            .addCase(newFolder.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.[0]) state.folders.unshift(action.payload[0]);
            })
            .addCase(newFolder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(getFolders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFolders.fulfilled, (state, action) => {
                state.loading = false;
                state.folders = action.payload;
            })
            .addCase(getFolders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(updateFolder.fulfilled, (state, action) => {
                const updated = action.payload?.[0];
                if (updated) {
                    const index = state.folders.findIndex(f => f.id === updated.id);
                    if (index !== -1) state.folders[index] = updated;
                }
            })
            .addCase(updateFolder.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
            .addCase(deleteFolder.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.folders = state.folders.filter(f => f.id !== deletedId);
            })
            .addCase(deleteFolder.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            });
    },
});

export const { clearError, setFilter, setSelectedFolder } = folderSlice.actions;
export default folderSlice.reducer;
