import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {reducer} from './favouritesSlice'; 



const persistConfig = {
    key: 'userFavorite',
    storage: AsyncStorage,
  };
  
  const persistedFavouritesReducer = persistReducer(persistConfig, reducer);
  
  

  export const store = configureStore({
    reducer: {
      favourites: persistedFavouritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/FLUSH', 'persist/REGISTER'],
        ignoredPaths: ['persist'],
      },
    })
  });
  
  export const persistor = persistStore(store);