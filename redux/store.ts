import { configureStore } from '@reduxjs/toolkit';
import { detectApi } from './services/detectService';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authSlice from './slices/authSlice';

export const store = configureStore({
    reducer: {
        [ detectApi.reducerPath ]: detectApi.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            detectApi.middleware
        )
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;