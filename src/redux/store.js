import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userAuthSlice';
import ownerReducer from './ownerAuthSlice';
import adminAuth from './adminAuth';
import userSlice from './userSlice';
import ownerSlice from './ownerSlice';
import wishlishSlice from './wishlishSlice';


export const store = configureStore({
  reducer: {
    userAuth: userReducer,
    adminAuth:adminAuth,
    ownerAuth: ownerReducer,
    user: userSlice,
    owner:ownerSlice,
    wishlist:wishlishSlice
  },
});
