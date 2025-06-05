import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice"
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'] // only persist user slice
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
    reducer: {
        customer: customerSlice,
        cart: cartSlice,
        user: persistedUserReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: import.meta.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;
