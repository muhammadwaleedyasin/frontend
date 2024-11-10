import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') || null : "",
    isAuthenticated: typeof window !== 'undefined' ? localStorage.getItem('isAuthenticated') === 'true' : false,
    user: null
  };
  

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    login: (state, action) => {
      const {token,user} = action.payload;
      state.token = token;
      state.user = user
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', true);
    },
    signup: (state, action) => {
        const {token,user} = action.payload;
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        localStorage.setItem('token', token);
        localStorage.setItem('isAuthenticated', true);
      },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.setItem('isAuthenticated', false);
      localStorage.removeItem('email');


    },
  },
});

export const { login, logout,signup } = userAuthSlice.actions;

export default userAuthSlice.reducer;
