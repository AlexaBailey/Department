import { toast } from 'react-toastify';

const baseToastStyles = {
	position: 'absolute',
	top: '10px',
	right: '10px',
	color: 'white',
	borderRadius: '4px',
	padding: '8px 16px',
	fontSize: '16px',
	boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
};

const getToastStylesByType = (type) => {
	switch (type) {
		case 'success':
			return { ...baseToastStyles, backgroundColor: '#4caf50' };
		case 'info':
			return { ...baseToastStyles, backgroundColor: '#2196f3' };
		case 'warn':
			return { ...baseToastStyles, backgroundColor: '#ff9800' };
		case 'error':
			return { ...baseToastStyles, backgroundColor: '#D22B2B' };
		default:
			return { ...baseToastStyles, backgroundColor: '#333' };
	}
};

const Notify = {
	sendNotification: (message, type) => {
		const toastStyles = getToastStylesByType(type);
		switch (type) {
			case 'success':
				toast.success(`${message}`, { style: toastStyles, toastId: 'IIT' });
				break;
			case 'info':
				toast.info(message, { style: toastStyles, toastId: 'IIT' });
				break;
			case 'warn':
				toast.warn(message, { style: toastStyles, toastId: 'IIT' });
				break;
			case 'error':
				toast.error(message, { style: toastStyles, toastId: 'IIT' });
				break;
			default:
				toast(message, { style: toastStyles, toastId: 'IIT' });
				break;
		}
	},
};

export default Notify;
