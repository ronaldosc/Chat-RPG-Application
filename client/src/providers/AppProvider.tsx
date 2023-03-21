import { ReactNode } from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserProvider';
import { WebSocketProvider } from './WebSocketProvider';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return <UserProvider>{children}</UserProvider>;
};
