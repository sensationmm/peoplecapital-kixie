import { useContext } from 'react';

import { SnackbarContext, defaultDuration, defaultPosition, defaultSeverity } from '../providers/Snackbar';

export const useSnackbar = ({ duration: globalDuration = defaultDuration, position: globalPosition = defaultPosition } = {}) => {
	const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);

	function open(text = '', severity, duration, position) {
		openSnackbar?.(text, severity || defaultSeverity, duration || globalDuration, position || globalPosition);
	}

	return [open, closeSnackbar];
};
