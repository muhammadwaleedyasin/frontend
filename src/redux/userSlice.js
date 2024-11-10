import { backend_url } from '@/libs/data';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'

export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
    const email = Cookies.get('email'); 
    if (email) {
        const response = await axios.post(`${backend_url}/api/user/getuser`, { email });
        return response.data.user;
    }
    throw new Error('Email not found in cookies');
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
