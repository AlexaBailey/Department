import { createSlice } from '@reduxjs/toolkit';
import { authExtraReducers } from './extraReducers';
import { initialState, reducers } from './reducers';

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers,
	extraReducers: authExtraReducers,
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
