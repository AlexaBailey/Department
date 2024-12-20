import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersService } from '../../../services';
import Notify from '../../../utils/Notify';

export const fetchAllUsers = createAsyncThunk(
	'users/fetchAll',
	async ({ pagination, search, sort }, { rejectWithValue }) => {
		try {
			return await UsersService.getAllUsers({
				pagination,
				search,
				sort,
			});
		} catch (error) {
			Notify.sendNotification(error.response?.data.message, 'error');

			return rejectWithValue(error.response.data);
		}
	},
);

export const changeUserStatus = createAsyncThunk(
	'users/changeUserStatus',
	async ({ id, status }, { rejectWithValue }) => {
		try {
			const response = await UsersService.changeUserStatus(id, status);
			Notify.sendNotification(
				'Пользователь успешно (де)активирован',
				'success',
			);
			return response;
		} catch (error) {
			Notify.sendNotification(
				error.response.data.message ??
					'Не удалось (де)активировать пользователя ' +
						error.response.data.message,
				'error',
			);
			return rejectWithValue(error.response.data);
		}
	},
);

export const changeUserPassword = createAsyncThunk(
	'users/changeUserPassword',
	async (id, { rejectWithValue }) => {
		try {
			return await UsersService.changeUserPassword(id);
		} catch (error) {
			Notify.sendNotification(`${error?.response.data.message}`, 'error');

			return rejectWithValue(error.response.data);
		}
	},
);

export const getAllRoles = createAsyncThunk(
	'users/getAllRoles',
	async (_, { rejectWithValue }) => {
		try {
			return await UsersService.getAllRoles();
		} catch (error) {
			Notify.sendNotification(`${error?.response.data.message}`, 'error');

			return rejectWithValue(error.response.data);
		}
	},
);

export const getUserWarehouse = createAsyncThunk(
	'users/getUserWarehouse',
	async (id, { rejectWithValue }) => {
		try {
			return await UsersService.getUserWarehouse(id);
		} catch (error) {
			Notify.sendNotification(`${error?.response.data.message}`, 'error');

			return rejectWithValue(error.response.data);
		}
	},
);

export const createUser = createAsyncThunk(
	'users/createUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await UsersService.createUser({
				...user,
			});
			Notify.sendNotification(
				`Пользовател ${user.username} успешно создан`,
				'success',
			);

			return response;
		} catch (error) {
			if (error.status === 400) {
				Notify.sendNotification(
					`Не удалось создать пользователя ${user.username} . Проверьте введеные данные`,
					'error',
				);
			} else {
				Notify.sendNotification(`${error?.response.data.message}`, 'error');
			}
			return rejectWithValue(error.response.data);
		}
	},
);

export const updateUser = createAsyncThunk(
	'users/updateUser',
	async ({ user }, { rejectWithValue }) => {
		try {
			const response = await UsersService.updateUser(user);
			Notify.sendNotification(
				`Пользователь ${user.username}  успешно обновлен`,
				'success',
			);
			return response.data;
		} catch (error) {
			Notify.sendNotification(`${error?.response.data.message}`, 'error');

			return rejectWithValue(error.response.data);
		}
	},
);
