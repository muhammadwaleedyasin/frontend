import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('adminToken') || null : "",
    isAdminAuthenticated: typeof window !== 'undefined' ? localStorage.getItem('adminToken') === 'true' : false,
  };
  

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    login: (state, action) => {
      const {token} = action.payload;
      state.token = token;
      state.isAdminAuthenticated = true;
      localStorage.setItem('adminToken', token);
      localStorage.setItem('isAdminAuthenticated', true);
    },
    logout: (state) => {
      state.token = null;
      state.isAdminAuthenticated = false;
      localStorage.removeItem('adminToken');
      localStorage.setItem('isAdminAuthenticated', false);
    },
  },
});

export const { login, logout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
