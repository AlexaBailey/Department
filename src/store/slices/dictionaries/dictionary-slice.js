import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './reducers';
import dictionaryExtra from './extraReducers';

const dictionarySlice = createSlice({
	name: 'dictionary',
	initialState,
	reducers,
	extraReducers: dictionaryExtra,
});

export const {
	setDictionaryName,
	setDictionaryType,
	setPagination,
	setSort,
	setApproved,
	setRowsPerPage,
	setSearchAction,
	setDependencies,
} = dictionarySlice.actions;

export default dictionarySlice.reducer;
