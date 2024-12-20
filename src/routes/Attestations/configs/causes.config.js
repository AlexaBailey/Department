export const causeTable = [
	{ id: 'id', label: 'ID', sortable: true },
	{
		id: 'type',
		label: 'Наименование',
		sortable: true,
	},
	{ id: 'priority.type', label: 'Тип', sortable: true },
];

export const getCauseForm = (priorities) => {
	return [
		{
			name: 'type',
			label: 'Наименование*',
			type: 'text',
			validation: { required: 'Обязательное поле' },
		},
		{
			name: 'priority',
			addName: 'priorityId',
			label: 'Приоритет*',
			type: 'select',
			options: priorities?.map((priority) => ({
				value: priority,
				label: priority.type,
			})),
			validation: { required: 'Обязательное поле' },
		},
	];
};
