import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/user.slice"
import taskReducer from "./Slices/tasks.slice"

const store = configureStore({
  reducer: {
    users: userReducer,
    tasks: taskReducer
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;