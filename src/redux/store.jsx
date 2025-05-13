import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import noteReducer from './NoteSlice';
import folderReducer from './FolderSlice';
import profileReducer from './ProfileSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        note: noteReducer,
        folder: folderReducer,
        profile: profileReducer
    }
});

export default store;
