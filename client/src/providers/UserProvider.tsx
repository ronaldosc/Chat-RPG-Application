import { api } from '@api';
import {
  encodeURL,
  customEnqueueSnackbar,
  anchorOrigin,
  transitionDurationDelayed,
} from '@helpers';
import { useSnackbar } from 'notistack';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ContextTypes {
  token: string;
  setToken: (token: string) => void;
  logout: () => void;
  signIn: ({ email, password }: SignInTypes) => Promise<void>;
}

export const UserContext = createContext<Partial<ContextTypes>>({});

interface UserProviderTypes {
  children: React.ReactNode;
}

interface SignInTypes {
  email: string;
  password: string;
}

export const UserProvider = ({ children }: UserProviderTypes) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState<string>();

  const signIn = async ({ email, password }: SignInTypes): Promise<void> => {
    try {
      const { data } = await api.post('/user/login', { email, password });
      customEnqueueSnackbar('Login realizado com sucesso!', 'success');
      localStorage.setItem('token', data);
      navigate(encodeURL(['feed']));

      setToken(data);
    } catch (error) {
      if (email && password) {
        enqueueSnackbar('Erro ao realizar login!', {
          variant: 'error',
          anchorOrigin: { ...anchorOrigin, horizontal: 'right' },
          transitionDuration: transitionDurationDelayed,
        });
      } else return undefined;

      if (!email) customEnqueueSnackbar('Campo e-mail vazio!');

      if (!password) customEnqueueSnackbar('Campo senha vazio!');
    }
  };

  const logout = async () => {
    try {
      await api.post('/user/logout');

      sessionStorage.removeItem('token');
      setToken(undefined);
      navigate(encodeURL(['home']));
      customEnqueueSnackbar('Logout realizado com sucesso!', 'success');
      navigate(encodeURL(['home']));
    } catch (error) {
      customEnqueueSnackbar('Erro ao realizar logout!', 'error');
    }
  };

  useEffect(() => {
    const storagedToken = sessionStorage.getItem('token');
    if (storagedToken) {
      setToken(storagedToken);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        signIn,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
