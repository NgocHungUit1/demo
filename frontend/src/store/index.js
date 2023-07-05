import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slice/user.slice"
import clientReducer from "./Slice/client.slice"
export const store = configureStore({
    reducer: {
        user: usersReducer,
        client: clientReducer
    },
});

