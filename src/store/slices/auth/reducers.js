import { TOKEN, REFRESH_TOKEN } from '../../../constants';

export const initialState = {
	user: null,
	loading: false,
	error: null,
};

export const reducers = {
	logout: (state) => {
		sessionStorage.removeItem(TOKEN);
		sessionStorage.removeItem(REFRESH_TOKEN);
		state.user = null;
	},
};
