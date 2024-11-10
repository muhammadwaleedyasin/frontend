import { backend_url } from '@/libs/data';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'



export const fetchOwner = createAsyncThunk('users/fetchUsers', async () => {
    const email = Cookies.get('ownerEmail'); 
    if (email) {
        const response = await axios.post(`${backend_url}/api/owner/getowner`,{email});
        return response.data.owner;
    }
    throw new Error('Email not found in cookies');
});

const ownerSlice = createSlice({
    name: 'owner',
    initialState: {
        owner: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOwner.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOwner.fulfilled, (state, action) => {
                state.loading = false;
                state.owner = action.payload;
            })
            .addCase(fetchOwner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default ownerSlice.reducer;
