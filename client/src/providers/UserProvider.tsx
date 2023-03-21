import { api } from '@api';
import { encodeURL } from '@helpers';
import { useSnackbar } from 'notistack';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface ContextTypes {
  token: string;
  setToken: (token: string) => void;
  logout: () => void;
  signIn: ({ email, password }: SignInTypes) => Promise<void>;
}

export const UserContext = createContext<Partial<ContextTypes>>({});

interface UserProviderTypes {
  children: ReactNode;
}

interface SignInTypes {
  email: string;
  password: string;
}

interface UserTypes {
  userId: string;
}

export const UserProvider = ({ children }: UserProviderTypes) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState<string>();

  const signIn = async ({ email, password }: SignInTypes) => {
    try {
      const { data } = await api.post('/user/login', { email, password });
      enqueueSnackbar('Login realizado com sucesso!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      localStorage.setItem('token', data);
      navigate(encodeURL(['feed']));

      setToken(data);
    } catch (error) {
      enqueueSnackbar('Erro ao realizar login!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  };

  const logout = async () => {
    try {
      await api.post('/user/logout');

      localStorage.removeItem('token');
      setToken(undefined);
      navigate(encodeURL(['home']));
      enqueueSnackbar('Logout realizado com sucesso!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      navigate(encodeURL(['home']));
    } catch (error) {
      enqueueSnackbar('Erro ao realizar logout!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  };

  useEffect(() => {
    const storagedToken = localStorage.getItem('token');
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
