export const selectRoles = (state) => state.users.roles;
export const selectUsers = (state) => state.users.users;
export const selectUser = (state, userId, open) => {
	if (open && userId) {
		const user = state.users.users.find((user) => user.id === userId);
		return !!user;
	}
	return null;
};
