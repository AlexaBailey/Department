import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './reducers';
import { usersExtraReducers } from './extraReducers';

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers,
	extraReducers: usersExtraReducers,
});
export const {
	setPagination,
	setSearchAction,
	setSort,
	cleanStore,
	setRowsPerPage,
} = usersSlice.actions;

export default usersSlice.reducer;
