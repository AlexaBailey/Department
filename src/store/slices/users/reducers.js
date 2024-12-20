import { LIST_SIZE } from '../../../constants';

export const initialState = {
	users: [],
	pagination: { size: LIST_SIZE, page: 0 },
	search: '',
	sort: 'id,asc',
	totalElements: 0,
	loading: false,
	warehouse: {},
	roles: [],
	rolesLoading: false,
	rolesError: '',
};

const reducers = {
	setPagination: (state, action) => {
		state.pagination = action.payload;
	},
	setRowsPerPage: (state, action) => {
		state.pagination.size = action.payload;
		state.pagination.page = 0;
	},

	setSearchAction: (state, action) => {
		state.search = action.payload;
	},
	setSort: (state, action) => {
		state.sort = action.payload;
	},
	cleanStore: () => {
		return initialState;
	},
};
export default reducers;
