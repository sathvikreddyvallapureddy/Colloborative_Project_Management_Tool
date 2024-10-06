import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: localStorage.getItem("UserInfo")
    ? JSON.parse(localStorage.getItem("UserInfo"))
    : null,
  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("UserInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("UserInfo");
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});
export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;
export default authSlice.reducer;
