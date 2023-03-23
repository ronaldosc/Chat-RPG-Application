import { api } from '@api';
import { encodeURL } from '@helpers';
import { SharedProps, SnackbarOrigin, useSnackbar } from 'notistack';
import {
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
const anchorOrigin: SharedProps & SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
  transitionDuration: { enter: 100, exit: 400 },
};
export const UserProvider = ({ children }: UserProviderTypes) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState<string>();

  const signIn = async ({ email, password }: SignInTypes) => {
    try {
      const { data } = await api.post('/user/login', { email, password });
      enqueueSnackbar('Login realizado com sucesso!', {
        variant: 'success',
        anchorOrigin,
      });
      sessionStorage.setItem('token', data);
      navigate(encodeURL(['feed']));

      setToken(data);
    } catch (error) {
      if (email && password)
        enqueueSnackbar('Erro ao realizar login!', {
          variant: 'error',
          anchorOrigin,
        });

      if (!email)
        enqueueSnackbar('Campo e-mail vazio!', {
          variant: 'warning',
          anchorOrigin,
        });

      if (!password)
        enqueueSnackbar('Campo senha vazio!', {
          variant: 'warning',
          anchorOrigin,
        });
    }
  };

  const logout = async () => {
    try {
      await api.post('/user/logout');

      sessionStorage.removeItem('token');
      setToken(undefined);
      navigate(encodeURL(['home']));
      enqueueSnackbar('Logout realizado com sucesso!', {
        variant: 'success',
        anchorOrigin,
      });
      navigate(encodeURL(['home']));
    } catch (error) {
      enqueueSnackbar('Erro ao realizar logout!', {
        variant: 'error',
        anchorOrigin,
      });
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
