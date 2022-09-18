import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "admin",
  initialState: {
    adminUser: null,
    users: [],
    isFetching: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.adminUser = action.payload;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.isFetching = false;
      state.adminUser = null;
    },

    // ----------------------------------- User CRUD ------------------------------------

    startUserAction: (state) => {
      state.isFetching = true;
    },

    failUserAction: (state) => {
      state.isFetching = false;
    },

    // GET User
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },

    // DELETE User
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },

    // UPDATE User
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    },

    // CREATE USER
    createUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logOut,
  startUserAction,
  failUserAction,
  getUserSuccess,
  deleteUserSuccess,
  updateUserSuccess,
  createUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
