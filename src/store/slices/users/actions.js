import { changeUserStatus, fetchAllUsers, updateUser } from './thunks';

export const updateUserandFetch =
	({ setFormOpen, search, pagination, user }) =>
	async (dispatch) => {
		try {
			const response = await dispatch(updateUser({ user })).unwrap();
			if ((response.status = 200)) {
				await dispatch(
					fetchAllUsers({
						pagination,
						search: search,
					}),
				).unwrap();
				setFormOpen(false);
			}
		} catch (err) {}
	};

export const changeStatusandFetch =
	({ pagination, search, id, status }) =>
	async (dispatch) => {
		try {
			const response = await dispatch(
				changeUserStatus({ id, status }),
			).unwrap();
			if (response.status === 200) {
				await dispatch(
					fetchAllUsers({
						pagination: pagination,
						search: search,
					}),
				).unwrap();
			}
		} catch (err) {}
	};
