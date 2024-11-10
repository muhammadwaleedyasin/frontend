import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ownerToken: typeof window !== 'undefined' ? localStorage.getItem('ownerToken') || null : "",
    isOwnerAuthenticated: typeof window !== 'undefined' ? localStorage.getItem('isOwnerAuthenticated') === 'true' : false,
    owner: null
  };
  

const ownerAuthSlice = createSlice({
  name: 'ownerAuth',
  initialState,
  reducers: {
    ownerLogin: (state, action) => {
      const {token,owner} = action.payload;
      state.ownerToken = token;
      state.owner = owner
      state.isOwnerAuthenticated = true;
      localStorage.setItem('ownerToken', token);
      localStorage.setItem('isOwnerAuthenticated', true);
    },
    ownerSignup: (state, action) => {
        const {token,owner} = action.payload;
        state.ownerToken = token;
        state.owner = owner;
        state.isOwnerAuthenticated = true;
        localStorage.setItem('ownerToken', token);
        localStorage.setItem('isOwnerAuthenticated', true);
      },
    ownerLogout: (state) => {
      state.ownerToken = null;
      state.owner = null;
      state.isOwnerAuthenticated = false;
      localStorage.removeItem('ownerToken');
      localStorage.setItem('isOwnerAuthenticated', false);
      localStorage.removeItem('ownerEmail');

    },
  },
});

export const { ownerLogin, ownerSignup,ownerLogout } = ownerAuthSlice.actions;

export default ownerAuthSlice.reducer;
