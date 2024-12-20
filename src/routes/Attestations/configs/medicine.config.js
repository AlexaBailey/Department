export const medicineTable = [
	{ id: 'id', label: 'ID', sortable: true },
	{ id: 'name', label: 'Наименование', sortable: true },
];

export const getMedicineForm = () => {
	return [
		{
			name: 'name',
			label: 'Наименование*',
			type: 'text',
			validation: { required: 'Обязательное поле' },
		},
	];
};
