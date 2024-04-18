import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  isGuest: false,
};

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.isGuest = action.payload.isGuest;
    },
    loginFailue: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.isGuest = false;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateGuestStatus: (state, action) => {
      state.isGuest = action.payload;
    },
  },
});

export const { loginStart, loginFailue, loginSuccess, logout, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
