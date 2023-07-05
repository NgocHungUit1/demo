import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: undefined
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { setClient, setAccessToken } = clientSlice.actions;
export default clientSlice.reducer;
