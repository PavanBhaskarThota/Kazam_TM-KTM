import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/user.slice"

const store = configureStore({
  reducer: {
    users: userReducer
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;