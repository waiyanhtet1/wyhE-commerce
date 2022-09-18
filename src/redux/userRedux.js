import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    clientFetching: false,
    clientError: null,
  },
  reducers: {
    actionStart: (state) => {
      state.clientFetching = true;
    },
    loginSuccess: (state, action) => {
      state.clientFetching = false;
      state.currentUser = action.payload;
      state.clientError = null;
    },
    actionFail: (state, action) => {
      state.clientFetching = false;
      state.clientError = action.payload;
    },
    logOut: (state) => {
      state.clientFetching = false;
      state.currentUser = null;
    },
    registerSuccess: (state) => {
      state.clientFetching = false;
      state.clientError = null;
    },
  },
});

export const {
  actionStart,
  loginSuccess,
  actionFail,
  logOut,
  registerSuccess,
} = userSlice.actions;
export default userSlice.reducer;
