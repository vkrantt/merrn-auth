import { createSlice } from "@reduxjs/toolkit";
import { authReducers } from "../reducers/authreducers";

const initialState = {
  userDetail: localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: authReducers,
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
