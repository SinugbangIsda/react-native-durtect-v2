import { configureStore } from '@reduxjs/toolkit';
import { detectApi } from './services/detectService';
import { setupListeners } from '@reduxjs/toolkit/dist/query';


export const store = configureStore({
    reducer: {
        [ detectApi.reducerPath ]: detectApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            detectApi.middleware
        )
});

setupListeners(store.dispatch);