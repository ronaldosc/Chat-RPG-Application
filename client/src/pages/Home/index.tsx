import { useSnackbar } from 'notistack';
import { Color } from '../../components/common/constants';
import { House } from '@phosphor-icons/react';
import { Button } from '../../components/Button/index';
import { BodyText, H1 } from '../../components/common/typography';
import { Header } from '../../components/Header';
import { Container } from '../../components/Container';
import { Logo } from '../../assets/icons/logo';
import { useNavigate } from 'react-router-dom';
import { encodeURL } from '../../helpers/URLNavigationReplace';
import { TextInput } from '../../components/common/inputs';
import { useState } from 'react';
import { api } from '../../libs/api';

interface LoginTypes {
  email: string;
  password: string;
}

export const Home = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [login, setLogin] = useState<LoginTypes>({
    email: '',
    password: '',
  });

  async function handleLogin() {
    try {
      await api.post('/user/login', login);
      enqueueSnackbar('Login realizado com sucesso!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      navigate(encodeURL(['feed']));
    } catch (error) {
      enqueueSnackbar('Erro ao realizar login!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });

      await console.log(error);
    }
  }

  return (
    <Container
      width="90vw"
      height="60vh"
      gap="12px"
      backgroundColor="rgba(31, 25, 35, 0.5)"
    >
      <Logo width="95px" height="108px" />
      <H1 light>Chat RPG</H1>
      <TextInput
        placeholder="Email"
        label="E-mail"
        lightLabel
        onChange={(e) => setLogin({ ...login, email: e.target.value })}
      />
      <TextInput
        placeholder="Senha"
        label="Senha"
        type="password"
        lightLabel
        onChange={(e) =>
          setLogin({
            ...login,
            password: e.target.value,
          })
        }
      />
      <Container
        width="80%"
        height="10%"
        direction="row"
        gap="12px"
        backgroundColor="transparent"
      >
        <Button
          label="Entrar"
          color={Color.Green}
          onClick={() => handleLogin()}
        />
        <Button
          label="Cadastre-se"
          color={Color.Gold}
          onClick={() => navigate(encodeURL(['register']))}
        />
      </Container>
    </Container>
  );
};
