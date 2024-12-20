export const selectDictionaryData = (state) => state.dictionary.data;
export const selectDictionaryPagination = (state) =>
	state.dictionary.pagination;
export const selectDictionaryTotalElements = (state) =>
	state.dictionary.totalElements;
export const selectDictionaryLoading = (state) => state.dictionary.loading;
export const selectDictionaryError = (state) => state.dictionary.error;
