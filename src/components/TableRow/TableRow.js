import React from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';
import { STAGE_MAP } from '../../constants';

export default function GenericTableRow({
	approve = false,
	dataObject,
	fieldsToDisplay,
	setOpen = null,
	sxStyles = null,
	children,
	renderField,
}) {
	const getFieldValue = (obj, fieldPath) => {
		const value =
			fieldPath?.split('.').reduce((value, key) => value?.[key], obj) ??
			obj[fieldPath];

		if (typeof value === 'boolean') {
			if (fieldPath === 'adult') {
				return value ? 'Нет' : 'Да';
			}
			return value ? 'Да' : 'Нет';
		}
		if (fieldPath === 'stage') {
			return STAGE_MAP[value] || 'Не указан';
		}
		return value ?? 'N/A';
	};

	if (!dataObject) return <TableCell>Загрузка</TableCell>;

	return (
		<TableRow
			sx={{
				cursor: 'pointer',
				'&:hover': {
					backgroundColor: 'rgba(0,0,0,0.1)',
				},
				...sxStyles,
			}}
			onClick={(e) => {
				e.stopPropagation();
				if (e.target.type !== 'checkbox') {
					setOpen && setOpen(true);
				}
			}}
			key={dataObject.id}
		>
			{children && <TableCell>{children}</TableCell>}
			{fieldsToDisplay?.map((field, index) => {
				const fieldValue = getFieldValue(dataObject, field);
				const formattedValue =
					approve && !dataObject.approved ? `[${fieldValue}]` : fieldValue;

				const displayValue = renderField
					? renderField(field, formattedValue)
					: formattedValue;

				return (
					<TableCell key={index}>
						<Typography
							sx={{
								color: approve && !dataObject.approved ? 'red' : 'inherit',
							}}
						>
							{displayValue}
						</Typography>
					</TableCell>
				);
			})}
		</TableRow>
	);
}
