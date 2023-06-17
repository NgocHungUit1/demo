import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
