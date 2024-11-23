import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, useState } from 'react';

export const defaultSeverity = 'info';
export const defaultPosition = { vertical: 'bottom', horizontal: 'center' };
export const defaultDuration = 4000;
export const defaultInterval = 250;

export const SnackbarContext = createContext({ openSnackbar: () => null, closeSnackbar: () => null });

const SnackbarProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('');
	const [duration, setDuration] = useState(defaultDuration);
	const [position, setPosition] = useState(defaultPosition);

	const [severity, setSeverity] = useState(defaultSeverity);

	const triggerSnackbar = (text, severity, duration, position) => {
		setText(text);
		setSeverity(severity || defaultSeverity);
		setDuration(duration || defaultDuration);
		setPosition(position || defaultPosition);
		setOpen(true);
	};

	const openSnackbar = (text, severity, duration, position) => {
		if (open) {
			setOpen(false);
			setTimeout(() => {
				triggerSnackbar(text, severity, duration, position);
			}, defaultInterval);
		} else {
			triggerSnackbar(text, severity, duration, position);
		}
	};

	const closeSnackbar = () => {
		setOpen(false);
	};

	return (
		<SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
			{children}

			<Snackbar open={open} autoHideDuration={duration} onClose={closeSnackbar} aria-describedby="client-snackbar" anchorOrigin={position}>
				<Alert onClose={closeSnackbar} severity={severity}>
					{text}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

export default SnackbarProvider;
