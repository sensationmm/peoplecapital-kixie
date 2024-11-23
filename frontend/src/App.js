import { ThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';

import SnackbarProvider from './providers/Snackbar';
import { theme } from './utils/mui-theme';
import { SentMessages } from './views/SentMessages';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <RecoilRoot>
            <SentMessages />
        </RecoilRoot>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
