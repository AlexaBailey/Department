import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { relogin } from '../store/slices';
import { logout } from '../store/slices/auth/auth-slice';
import { ADMIN } from '../constants';
import Notify from '../utils/Notify';

export const useAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);

	const handleLogout = () => {
		try {
			dispatch(logout());
			Notify.sendNotification('Вы покинули систему', 'success');
		} catch (err) {
			Notify.sendNotification('Не получилось покинуть систему', 'error');
		}
	};

	const checkAuth = async () => {
		if (!user) {
			try {
				await dispatch(relogin()).unwrap();
				return true;
			} catch (err) {
				Notify.sendNotification('Не удалось перезайти в систему', 'error');
				dispatch(logout());
				return false;
			}
		} else {
			if (user.roles && user.roles.length > 0) {
				if (user.roles[0].authority === ADMIN) {
					return true;
				} else {
					Notify.sendNotification('Недостаточно прав', 'error');
					dispatch(logout());
					navigate('login');
					return false;
				}
			} else {
				Notify.sendNotification('Роль не установлена', 'error');
				dispatch(logout());
				navigate('login');
				return false;
			}
		}
	};
	return { user, checkAuth, handleLogout };
};
