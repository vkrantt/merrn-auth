export const authReducers = {
  setCredentials: (state, action) => {
    state.userDetail = action.payload;
    localStorage.setItem("userDetail", JSON.stringify(action.payload));
  },
  logout: (state) => {
    state.isAuthenticated = false;
    localStorage.removeItem("userDetail");
  },
};
