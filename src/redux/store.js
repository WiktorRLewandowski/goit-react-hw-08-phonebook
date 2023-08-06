import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { contactReducer } from "./slices/contactSlice";
import { filterReducer } from "./slices/filterSlice";
import { authReducer } from "./auth/slice";
import {
   persistStore,
   persistReducer,
   FLUSH,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
   REHYDRATE,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";


const middleware = [
   ...getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
      }
   })
]

const authPersistConfig = {
   key: 'auth',
   storage,
   whitelist: ['token']
}

export const store = configureStore({
   reducer: {
      auth: persistReducer(authPersistConfig, authReducer),
      contacts: contactReducer,
      filter: filterReducer,
   },
   middleware,
   // devTools: process.env.NODE_ENV === 'development'
})

export const persistor = persistStore(store);