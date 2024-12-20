export const baseTable = [
	{ id: 'id', label: 'ID', sortable: true },
	{ id: 'type', label: 'Наименование', sortable: true },
];

export const getBaseForm = () => {
	return [
		{
			name: 'type',
			label: 'Наименование*',
			type: 'text',
			validation: { required: 'Обязательное поле' },
		},
	];
};
export const getdictNameForm = (name) => {
	return [
		{
			name: name,
			edit: 'type',
			label: 'Наименование*',
			type: 'text',
			validation: { required: 'Обязательное поле' },
		},
	];
};
