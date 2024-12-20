import { login, relogin } from './thunks';

export const authExtraReducers = (builder) => {
	builder
		.addCase(login.pending, (state) => {
			state.loading = true;
		})
		.addCase(login.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload;
		})
		.addCase(login.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(relogin.pending, (state) => {
			state.loading = true;
		})
		.addCase(relogin.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload;
		})
		.addCase(relogin.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
};
