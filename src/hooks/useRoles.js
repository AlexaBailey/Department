import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRoles, selectRoles } from '../store/slices/users';

export const useRoles = () => {
	const dispatch = useDispatch();
	const roles = useSelector(selectRoles);
	const rolesLoading = useSelector((state) => state.users.rolesLoading);
	const rolesError = useSelector((state) => state.users.rolesError);

	useEffect(() => {
		if (roles.length === 0) {
			dispatch(getAllRoles());
		}
	}, [dispatch, roles.length]);

	return { roles, rolesLoading, rolesError };
};
