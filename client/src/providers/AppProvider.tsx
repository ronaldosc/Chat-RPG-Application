import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return <UserProvider>{children}</UserProvider>;
};
