import axios from 'axios';
import {
	IIT_API_URL,
	API_HOST,
	CLIENT_ID,
	CLIENT_SECRET,
	TOKEN,
} from '../../constants/index';
import Notify from '../Notify';
import { AuthService } from '../../services';

const api = axios.create({
	baseURL: `${API_HOST}${IIT_API_URL}`,
});

api.interceptors.request.use(
	(config) => {
		const urlArr = config.url.split('/');
		const url = urlArr[urlArr.length - 1];

		if (url === 'token') {
			const authToken = window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
			config.headers['Authorization'] = `Basic ${authToken}`;
		} else {
			const authToken = sessionStorage.getItem(TOKEN);
			if (authToken) {
				config.headers['Authorization'] = `Bearer ${authToken}`;
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export const setupMiddleWare = (handleLogout) => {
	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			const urlArr = originalRequest.url.split('/');
			const url = urlArr[urlArr.length - 1];

			if (error.response?.status === 401 && url !== 'token') {
				try {
					await AuthService.relogin();

					const newToken = sessionStorage.getItem(TOKEN);
					if (newToken) {
						originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
						return api(originalRequest);
					}
				} catch (reloginError) {
					handleLogout();
					return Promise.reject(reloginError);
				}
			} else if (error.response?.status === 401 && url === 'token') {
				handleLogout();
			}

			if (error.response?.status) {
				Notify.sendNotification(
					error.response?.data?.message || 'Произошла ошибка на сервере',
					'error',
				);
			}

			return Promise.reject(error);
		},
	);
};

export default api;
