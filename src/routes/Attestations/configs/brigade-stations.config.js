export const getBrigadeStationsForm = (stations) => {
	return [
		{
			name: 'type',
			label: 'Наименование*',
			type: 'text',
			validation: { required: 'Обязательное поле' },
		},
		{
			addName: 'headBrigadeStationId',
			name: 'headBrigadeStation',
			label: 'Вышестоящая подстанция*',
			type: 'select',
			options: stations?.map((station) => ({
				value: station.headBrigadeStation,
				label: station.type,
			})),
			validation: { required: 'Обязательное поле' },
		},
	];
};
