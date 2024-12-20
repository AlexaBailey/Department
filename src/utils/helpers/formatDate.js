export const formatDate = (value) => {
	const ten = (i) => (i < 10 ? '0' : '') + i;
	const YYYY = value.getFullYear();
	const MM = ten(value.getMonth() + 1);
	const DD = ten(value.getDate());
	const HH = ten(value.getHours());
	const II = ten(value.getMinutes());
	return `${YYYY}-${MM}-${DD}T${HH}:${II}`;
};
