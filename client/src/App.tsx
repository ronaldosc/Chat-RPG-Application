import './assets/styles/global.css';
import { AppProvider } from '@providers';
import { SnackbarProvider } from 'notistack';
import { Router } from './routes/routes';

export const App = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <AppProvider>
        <Router />
      </AppProvider>
    </SnackbarProvider>
  );
};
