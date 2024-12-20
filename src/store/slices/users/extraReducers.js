import {
	fetchAllUsers,
	changeUserStatus,
	createUser,
	updateUser,
	getAllRoles,
} from './thunks';

export const usersExtraReducers = (builder) => {
	builder

		.addCase(fetchAllUsers.pending, (state) => {
			state.loading = true;
		})
		.addCase(fetchAllUsers.fulfilled, (state, action) => {
			state.users = action.payload.content;
			state.totalElements = action.payload.totalElements;
			state.loading = false;
		})
		.addCase(fetchAllUsers.rejected, (state) => {
			state.loading = false;
		})

		.addCase(changeUserStatus.pending, (state) => {
			state.loading = true;
		})
		.addCase(changeUserStatus.fulfilled, (state, action) => {
			const { id, status } = action.payload;
			const userIndex = state.users.findIndex((user) => user.id === id);
			if (userIndex !== -1) {
				state.users[userIndex] = {
					...state.users[userIndex],
					isUserEnable: status,
				};
			}
			state.loading = false;
		})
		.addCase(changeUserStatus.rejected, (state) => {
			state.loading = false;
		})

		.addCase(createUser.fulfilled, (state, action) => {
			state.users.push(action.payload);
			state.totalElements += 1;
		})
		.addCase(createUser.rejected, (state) => {
			state.loading = false;
		})

		.addCase(updateUser.fulfilled, (state, action) => {
			const updatedUser = action.payload;
			const userIndex = state.users.findIndex(
				(user) => user.id === updatedUser.id,
			);
			if (userIndex !== -1) {
				state.users[userIndex] = updatedUser;
			}
		})
		.addCase(updateUser.rejected, (state) => {
			state.loading = false;
		})

		.addCase(getAllRoles.pending, (state) => {
			state.loading = true;
		})
		.addCase(getAllRoles.fulfilled, (state, action) => {
			state.roles = action.payload.roles || action.payload;
			state.loading = false;
		})
		.addCase(getAllRoles.rejected, (state) => {
			state.loading = false;
		});
};
