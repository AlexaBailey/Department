import { IIT_API_URL, API_HOST, API_URL, CLIENT_ID } from './env';
const COMMON_API = `${API_HOST || window.location.origin}`;

export const TOKEN = 'admin_token';
export const REFRESH_TOKEN = 'admin_refresh_token';

export const REQUEST_API = {
	IIT: `${COMMON_API}${IIT_API_URL}`,
};
