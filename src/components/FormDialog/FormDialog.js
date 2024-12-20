/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	FormHelperText,
	FormControlLabel,
	Checkbox,
	FormLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import styles from './FormDialog.module.scss';

const FormDialog = ({
	defaultValues = {},
	open,
	onClose,
	extraFieldsCondition = null,
	statement = null,
	fields = {},
	submitFunction,
	dialogTitle,
	mode = 'add',
	buttonText = 'Добавить',
	cancelText = 'Отменить',
}) => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
		watch,
	} = useForm({
		mode: 'onChange',
		defaultValues,
	});
	const [res, setReset] = useState(false);
	const watchedRole = watch('roles');

	useEffect(() => {
		if (open && !res && mode === 'edit') {
			reset(defaultValues);
		}
	}, [open, defaultValues, fields, res, mode]);

	const onSubmit = (data) => {
		setReset(true);
		submitFunction(data);
	};
	const handleClose = () => {
		onClose();
	};
	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<DialogTitle>{dialogTitle || 'Форма'}</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					{Object.keys(fields).length > 0 &&
						fields.map((field) => (
							<FormControl
								key={field.name}
								fullWidth
								margin="normal"
								error={!!errors[field.name]}
							>
								{field.type === 'select' && (
									<InputLabel>{field.label}</InputLabel>
								)}
								<Controller
									name={
										mode === 'edit' ? (field.edit ?? field.name) : field.name
									}
									control={control}
									rules={field.validation}
									defaultValue={
										defaultValues[
											mode === 'edit' ? (field.edit ?? field.name) : field.name
										]
											? JSON.stringify(
													defaultValues[
														mode === 'edit'
															? (field.edit ?? field.name)
															: field.name
													],
												)
											: ''
									}
									render={({ field: controllerField }) => {
										if (field.type === 'select') {
											return (
												<Select
													{...controllerField}
													label={field.label}
													value={controllerField.value || ''}
													onChange={(e) => {
														controllerField.onChange(e.target.value);
													}}
												>
													{field.options?.map((option, index) => (
														<MenuItem
															key={index}
															value={JSON.stringify(option.value)}
														>
															{option.label}
														</MenuItem>
													))}
												</Select>
											);
										} else if (field.type === 'checkbox') {
											return (
												<FormControlLabel
													control={
														<Checkbox
															{...controllerField}
															checked={!!controllerField.value}
														/>
													}
													label={field.label}
												/>
											);
										}

										if (field.type === 'radio') {
											return (
												<FormControl component="fieldset" margin="normal">
													<FormLabel component="legend">
														{field.label}
													</FormLabel>
													<RadioGroup
														{...controllerField}
														value={controllerField.value || field.defaultValue}
														onChange={(e) =>
															controllerField.onChange(e.target.value)
														}
													>
														{field.options?.map((radio) => (
															<FormControlLabel
																key={radio.value}
																value={radio.value}
																control={<Radio />}
																label={radio.label}
															/>
														))}
													</RadioGroup>
													{errors.radioOption && (
														<FormHelperText error>
															Пожалуйста, выберите один из вариантов
														</FormHelperText>
													)}
												</FormControl>
											);
										}

										return (
											<TextField
												{...controllerField}
												label={field.label}
												error={!!errors[field.name]}
												type={field.type || 'text'}
												value={controllerField.value || ''}
											/>
										);
									}}
								/>
								<FormHelperText>
									{errors[field.name] && errors[field.name]?.message}
								</FormHelperText>
							</FormControl>
						))}

					{extraFieldsCondition &&
						extraFieldsCondition(watchedRole, statement)?.map((extraField) => (
							<FormControl
								key={extraField.name}
								fullWidth
								margin="normal"
								error={!!errors[extraField.name]}
							>
								<InputLabel sx={{ padding: '0px 4px', bgcolor: 'white' }}>
									{extraField.label}
								</InputLabel>
								<Controller
									name={
										mode === 'edit'
											? (extraField.edit ?? extraField.name)
											: extraField.name
									}
									defaultValue={
										defaultValues[
											mode === 'edit'
												? (extraField.edit ?? extraField.name)
												: extraField.name
										]?.id || null
									}
									control={control}
									render={({ field: controllerField }) => (
										<Select
											{...controllerField}
											value={controllerField.value?.id || ''}
											onChange={(e) => {
												const selectedOption = extraField.options.find(
													(option) => option.value.id === e.target.value,
												);
												controllerField.onChange(selectedOption.value);
											}}
										>
											{extraField.options.map((option, index) => (
												<MenuItem key={index} value={option.value.id}>
													{' '}
													{option.label}
												</MenuItem>
											))}
										</Select>
									)}
								/>
								<FormHelperText>
									{errors[extraField.name]?.message}
								</FormHelperText>
							</FormControl>
						))}

					<DialogActions sx={{ paddingRight: 0 }} className={styles.actions}>
						<Button variant="cancel" onClick={handleClose}>
							{cancelText}
						</Button>
						<Button variant="outlined" type="submit">
							{buttonText}
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default FormDialog;
