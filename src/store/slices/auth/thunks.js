import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../../services';
import { Notify } from '../../../utils';
import { ADMIN } from '../../../constants';

export const login = createAsyncThunk(
	'auth/login',
	async (data, { rejectWithValue }) => {
		try {
			const result = await AuthService.login(data);
			if (result.data.roles[0].authority === ADMIN) {
				return AuthService.setResponseUser(result.data);
			} else {
				Notify.sendNotification('Недостаточно прав', 'error');
				throw new Error();
			}
		} catch (error) {
			Notify.sendNotification(
				error.response.data.status === 401
					? 'Проверьте введенные данные'
					: 'Попробуйте зайти еще раз',
				'error',
			);
			return rejectWithValue(error?.response?.data);
		}
	},
);

export const relogin = createAsyncThunk(
	'auth/relogin',
	async (_, { rejectWithValue }) => {
		try {
			return await AuthService.relogin();
		} catch (error) {
			Notify.sendNotification('Не удалось перезайти в систему', 'error');
			return rejectWithValue(error.response.data);
		}
	},
);
