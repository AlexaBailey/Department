import { TextField } from '@mui/material';
import { useCallback, useState, forwardRef } from 'react';

const AutoFillTextField = forwardRef(
	({ onChange, inputProps, InputLabelProps, ...rest }, ref) => {
		const [fieldHasValue, setFieldHasValue] = useState(false);

		const makeAnimationStartHandler = (stateSetter) => (e) => {
			const autofilled = !!e.target?.matches('*:-webkit-autofill');
			if (e.animationName === 'mui-auto-fill') {
				stateSetter(autofilled);
			}

			if (e.animationName === 'mui-auto-fill-cancel') {
				stateSetter(autofilled);
			}
		};

		const _onChange = useCallback(
			(e) => {
				onChange(e.target.value);
				setFieldHasValue(e.target.value !== '');
			},
			[onChange],
		);

		return (
			<TextField
				ref={ref}
				onChange={_onChange}
				{...rest}
				slotProps={{
					htmlInput: {
						onAnimationStart: makeAnimationStartHandler(setFieldHasValue),
						...inputProps,
					},

					inputLabel: {
						shrink: fieldHasValue,
						...InputLabelProps,
					},
				}}
			/>
		);
	},
);

export default AutoFillTextField;
