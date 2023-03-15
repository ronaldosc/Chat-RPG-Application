import { SnackbarProvider } from 'notistack';
import { Router } from './routes/routes';
import './styles/global.css';

export const App = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Router />
    </SnackbarProvider>
  );
};
