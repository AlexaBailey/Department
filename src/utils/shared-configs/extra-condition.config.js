export const extraFieldsCondition = (watchedRole, statement) => {
	if (!watchedRole) return;
	let parsedId;
	if (typeof watchedRole === 'string') {
		try {
			const parsedData = JSON.parse(watchedRole);
			parsedId = parsedData?.id;
		} catch (error) {
			return null;
		}
	} else {
		parsedId = watchedRole.id;
	}
	if (parsedId === 6 || parsedId === 7 || parsedId === 9) {
		return statement;
	}

	return null;
};
