import { REFRESH_TOKEN, TOKEN } from '../constants';
import { api } from '../utils/axios';

class AuthService {
	static async login(data) {
		const formData = new FormData();

		formData.append('username', data.username);
		formData.append('password', data.password);
		formData.append('grant_type', 'password');

		try {
			return await api.post(`/oauth/token`, formData);
		} catch (error) {
			throw error;
		}
	}

	static async relogin() {
		const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);

		if (refreshToken) {
			const formData = new FormData();
			formData.append('refresh_token', refreshToken);
			formData.append('grant_type', 'refresh_token');

			try {
				const response = await api.post(`/oauth/token`, formData);
				return this.setResponseUser(response.data);
			} catch (error) {
				throw error;
			}
		}
		return null;
	}

	static setResponseUser(data) {
		const {
			access_token: accessToken,
			refresh_token: refreshToken,
			name: username,
			roles,
			isPasswordShouldBeChanged,
			nameInfo,
			userId,
		} = data;

		sessionStorage.setItem(TOKEN, accessToken);
		sessionStorage.setItem(REFRESH_TOKEN, refreshToken);

		return {
			username,
			userId,
			nameInfo,
			roles,
			isPasswordShouldBeChanged,
		};
	}
}

export default AuthService;
