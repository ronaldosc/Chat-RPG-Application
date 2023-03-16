import { SnackbarProvider } from 'notistack';
import { AppProvider } from './providers';
import { Router } from './routes/routes';
import './styles/global.css';

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
