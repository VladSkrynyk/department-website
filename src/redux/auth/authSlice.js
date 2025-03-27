import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  token: null, // Додаємо токен
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginI: (state, action) => {
      state.isAdmin = true;
      state.token = action.payload; // Зберігаємо токен
    },
    logout: (state) => {
      state.isAdmin = false;
      state.token = null; // Видаляємо токен при виході
    },
  },
});

export const { loginI, logout } = authSlice.actions;
export default authSlice.reducer;
