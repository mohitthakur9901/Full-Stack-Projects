import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserSlice from './User/UserSlice';
import ThemeSlice from './Theme/ThemeSlice';


const rootReducer = combineReducers({
  user: UserSlice,
  theme: ThemeSlice,
});

const persistConfig = {
  key: 'user',
  storage, 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);