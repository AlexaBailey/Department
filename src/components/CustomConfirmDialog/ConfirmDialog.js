import React from 'react';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import { CustomDialog } from '../CustomDialog';

const ConfirmDialog = ({
	action,
	handleTargetFunction,
	confirm,
	setConfirmOpen,
}) => {
	return (
		<CustomDialog open={confirm} onClose={() => setConfirmOpen(false)}>
			<DialogTitle>{action}?</DialogTitle>
			<DialogActions>
				<Button onClick={() => setConfirmOpen(false)}>Нет</Button>
				<Button autoFocus onClick={() => handleTargetFunction()}>
					Да
				</Button>
			</DialogActions>
		</CustomDialog>
	);
};
export default ConfirmDialog;
