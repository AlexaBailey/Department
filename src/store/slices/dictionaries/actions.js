import { Notify } from '../../../utils';
import {
	approveDictionaryElements,
	createDictionaryElement,
	deleteDictionaryElements,
	fetchDictionaryElements,
	updateDictionaryElement,
} from './thunks';

export const updateDictionaryandFetch =
	({
		setFormOpen,
		approved = 'all',
		search,
		pagination,
		dictionaryName,
		element,
	}) =>
	async (dispatch) => {
		try {
			const response = await dispatch(
				updateDictionaryElement({
					dictionaryName,
					element,
				}),
			).unwrap();

			if (response) {
				setFormOpen(false);

				await dispatch(
					fetchDictionaryElements({
						approved: approved,
						dictionaryName: dictionaryName,
						pagination,
						search: search,
						sort: 'id,asc',
					}),
				).unwrap();
				Notify.sendNotification('Элемент успешно обновлен', 'success');
			}
		} catch (err) {}
	};

export const approveDictionaryAndFetch =
	({ approved, search, pagination, dictionaryName, ids }) =>
	async (dispatch) => {
		try {
			await dispatch(
				approveDictionaryElements({
					dictionaryName,
					ids,
				}),
			).unwrap();
			await dispatch(
				fetchDictionaryElements({
					approved: approved,
					dictionaryName: dictionaryName,
					pagination,
					search: search,
					sort: 'id,asc',
				}),
			).unwrap();

			Notify.sendNotification('Элемент(ы) успешно подтвержден(ы)', 'success');
		} catch (err) {}
	};

export const deleteDictionaryAndFetch =
	({
		setFormOpen,
		search,
		sort,
		pagination,
		dictionaryName,
		removableId,
		idToReplace,
	}) =>
	async (dispatch) => {
		try {
			await dispatch(
				deleteDictionaryElements({
					dictionaryName,
					removableId,
					idToReplace,
				}),
			).unwrap();
			setFormOpen(false);
			await dispatch(
				fetchDictionaryElements({
					approved: 'all',
					dictionaryName: dictionaryName,
					pagination,
					search: search,
					sort: sort,
				}),
			).unwrap();
			Notify.sendNotification('Элемент(ы) успешно удален(ы)', 'success');
		} catch (err) {}
	};

export const createDictionaryandFetch =
	({ setFormOpen, pagination, search, dictionaryName, element }) =>
	async (dispatch) => {
		try {
			const response = await dispatch(
				createDictionaryElement({
					dictionaryName,
					element,
				}),
			).unwrap();
			if (response) {
				setFormOpen(false);
				await dispatch(
					fetchDictionaryElements({
						approved: 'all',
						dictionaryName: dictionaryName,
						pagination,
						search: search,
						sort: 'id,asc',
					}),
				).unwrap();

				Notify.sendNotification('Элемент успешно создан', 'success');
			}

			return response.status;
		} catch (err) {}
	};
