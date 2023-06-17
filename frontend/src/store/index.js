import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slice/user.slice"
export const store = configureStore({
    reducer: {
        user: usersReducer,
    },
});

