export const settlemntTable = [
	{ id: 'id', fid: 'id', label: 'ID', sortable: true },
	{ id: 'type', fid: 'type', label: 'Наименование', sortable: true },
	{ id: 'region', fid: 'region.type', label: 'Область', sortable: true },
	{ id: 'district', fid: 'district.type', label: 'Район', sortable: true },
	{ id: 'city', fid: 'city', label: 'Город', sortable: false },
];

export const getSettlementForm = (regions, districts) => {
	return [
		{
			name: 'type',
			label: 'Наименование*',
			type: 'text',
			validation: { required: 'Обязательное поле' },
		},

		{
			addName: 'regionId',

			name: 'region',
			label: 'Область*',
			znach: 'region.type',
			object: 'region',

			type: 'select',
			sortField: 'region.type',
			options: regions?.map((region) => ({
				value: region,
				label: region.type,
			})),
			validation: { required: 'Обязательное поле' },
		},
		{
			addName: 'districtId',

			name: 'district',
			znach: 'district.type',
			object: 'district',
			label: 'Район*',
			type: 'select',
			sortField: 'district.type',
			options: districts?.map((district) => ({
				value: district,
				label: district.type,
			})),
			validation: { required: 'Обязательное поле' },
		},
		{
			name: 'city',
			label: 'Город',
			type: 'checkbox',
		},
	];
};

export const getSettlementFormattedData = (data, stat) => {
	return [];
};
