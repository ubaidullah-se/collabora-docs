import { createSlice } from "@reduxjs/toolkit";

export const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState: {
    value: localStorage.getItem("access-token") as string,
  },
  reducers: {
    updateAccessToken: (state, action) => {
      const accessToken = action.payload;
      localStorage.setItem("access-token", accessToken);
      state.value = accessToken;
    },
  },
});

export const { updateAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
