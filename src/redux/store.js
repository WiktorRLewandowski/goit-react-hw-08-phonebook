import { configureStore } from "@reduxjs/toolkit";
// import { rootReducer } from "./reducers";
import { contactReducer } from "./slices/contactSlice";
import { filterReducer } from "./slices/filterSlice";

export const store = configureStore({
   reducer: {
      contacts: contactReducer,
      filter: filterReducer,
   },
})