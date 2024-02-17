import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {} as User,
  },
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },
    // An Empty reducer, just used to register action "user/logoutUser"
    logoutUser: () => {},
  },
});

export const { updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
