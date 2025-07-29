// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer";
import { apiReducer } from "../api";


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiReducer.middleware,
    ),
});

export default store;
