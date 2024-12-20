export const initialState = {
	dictionaryName: 'street',
	type: 'ALL',
	data: [],
	pagination: { size: 10, page: 0 },
	sort: 'id,asc',
	totalElements: 0,
	loading: false,
	error: null,
};

const reducers = {
	setDictionaryName(state, action) {
		state.dictionaryName = action.payload;
	},
	setApproved(state, action) {
		const dictionaryName = state.dictionaryName;
		if (state[dictionaryName]) {
			state[dictionaryName].approved = action.payload;
		}
	},
	setDictionaryType(state, action) {
		const dictionaryName = state.dictionaryName;
		if (state[dictionaryName]) {
			state[dictionaryName].type = action.payload;
		}
	},

	setDependencies(state, action) {
		const dictionaryName = state.dictionaryName;
		if (state[dictionaryName]) {
			state[dictionaryName].dependencies
				? state[dictionaryName].dependencies.push(action.payload)
				: (state[dictionaryName].dependencies = action.payload);
		}
	},

	setRowsPerPage(state, action) {
		const dictionaryName = state.dictionaryName;
		if (state[dictionaryName]) {
			state[dictionaryName].pagination = { size: 10, page: 0 };
			state[dictionaryName].pagination.size = action.payload;
			state[dictionaryName].pagination.page = 0;
		}
	},

	setPagination(state, action) {
		const dictionaryName = state.dictionaryName;
		if (state[dictionaryName]) {
			state[dictionaryName].pagination = action.payload;
		}
	},

	setSort(state, action) {
		const dictionaryName = state.dictionaryName;
		if (state[dictionaryName]) {
			state[dictionaryName].sort = action.payload;
		}
	},

	setSearchAction(state, action) {
		const dictionaryName = state.dictionaryName;
		if (state[dictionaryName]) {
			state[dictionaryName].search = action.payload;
		}
	},

	setData(state, action) {
		const dictionaryName = state.dictionaryName;
		if (state[dictionaryName]) {
			state[dictionaryName].data = action.payload;
		}
	},

	setLoading(state, action) {
		const dictionaryName = state.dictionaryName;
		if (state[dictionaryName]) {
			state[dictionaryName].loading = action.payload;
		}
	},

	setError(state, action) {
		const dictionaryName = state.dictionaryName;
		if (state[dictionaryName]) {
			state[dictionaryName].error = action.payload;
		}
	},
};

export default reducers;
