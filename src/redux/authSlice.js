// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdmin: false, // Стан авторизації (за замовчуванням false)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAdmin = true;
    },
    logout: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
