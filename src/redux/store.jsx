import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import noteReducer from './NoteSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        note: noteReducer,
    }
});

export default store;
