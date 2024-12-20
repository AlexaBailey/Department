import { configureStore } from '@reduxjs/toolkit';
import {
	dictionaryReducer,
	userReducer,
	authReducer,
	brigadesReducer,
	settingsReducer,
	logsReducer,
} from './slices';
import { api } from '../utils/axios';
import { relogin } from './slices';
import { logout } from './slices/auth/auth-slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		users: userReducer,
		brigades: brigadesReducer,
		dictionary: dictionaryReducer,
		settings: settingsReducer,
		logs: logsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: { api, relogin, logout },
			},
		}),
});

export default store;
