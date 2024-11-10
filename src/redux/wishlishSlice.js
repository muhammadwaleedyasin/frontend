
import { backend_url } from '@/libs/data';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addWishlist = createAsyncThunk(
    'wishlist/addWishlist',
    async ({ userEmail, propertyData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${backend_url}/api/user/addwishlist`, { userEmail, propertyData });
           
            return userEmail;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeWishlist = createAsyncThunk(
    'wishlist/removeWishlist',
    async ({ userEmail, id }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${backend_url}/api/user/removewishlist`, { userEmail, id });
            return userEmail;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (userEmail, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${backend_url}/api/user/getwishlist/${userEmail}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlists',
    initialState: {
        wishlists: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addWishlist.fulfilled, (state, action) => {
                state.wishlists.push(action.payload);
            })
            .addCase(removeWishlist.fulfilled, (state, action) => {
                state.wishlists = state.wishlists.filter(item => item.id !== action.payload.id);
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.wishlists = action.payload;
            })
            .addCase(addWishlist.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(removeWishlist.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export default wishlistSlice.reducer;
