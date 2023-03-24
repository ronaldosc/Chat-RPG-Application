import { api } from '@api';
import { Logo } from '@assets/icons';
import { Button } from '@components/button';
import { Color, H1, TextInput } from '@components/common';
import { Container } from '@components/container';
import { encodeURL } from '@helpers';
import { useUser } from '@providers';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserTypes {
  email: string;
  password: string;
  contact: {
    userName?: string;
    firstName?: string;
    lastName?: string;
    profilePhoto?: string;
  };
}

interface PropTypes {
  user: UserTypes | null;
}

export const Register = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { signIn } = useUser();

  const [userProperties, setUserProperties] = useState<UserTypes>({
    email: '',
    password: '',
    contact: {
      userName: '',
    },
  });
  const [rePassword, setRePassword] = useState<string>('');

  async function createUser() {
    if (userProperties.password !== rePassword) {
      enqueueSnackbar('As senhas não coincidem!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      return;
    }
    try {
      await api.post('/user/signup', userProperties);
      enqueueSnackbar('Usuário criado com sucesso!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      if (signIn) {
        signIn({
          email: userProperties.email,
          password: userProperties.password,
        });
      }
      navigate(encodeURL(['feed']));
    } catch (error) {
      enqueueSnackbar(error?.response.data, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  }

  return (
    <>
      <Container
        width="90vw"
        height="90vh"
        gap="12px"
        backgroundColor="rgba(31, 25, 35, 0.5)"
        padding="20px"
        justify="start"
      >
        <Logo width="95px" height="108px" />
        <H1 light>Chat RPG</H1>
        <TextInput
          label="Nome"
          lightLabel
          onChange={(e) => {
            setUserProperties({
              ...userProperties,
              contact: { firstName: e.target.value },
            });
          }}
        />
        <TextInput
          label="Sobrenome"
          lightLabel
          onChange={(e) => {
            setUserProperties({
              ...userProperties,
              contact: { lastName: e.target.value },
            });
          }}
        />
        <TextInput
          label="Usuário"
          lightLabel
          onChange={(e) => {
            setUserProperties({
              ...userProperties,
              contact: { userName: e.target.value },
            });
          }}
        />
        <TextInput
          label="E-mail"
          type="email"
          lightLabel
          onChange={(e) => {
            setUserProperties({
              ...userProperties,
              email: e.target.value,
            });
          }}
        />
        <TextInput
          label="Senha"
          type="password"
          lightLabel
          onChange={(e) => {
            setUserProperties({
              ...userProperties,
              password: e.target.value,
            });
          }}
        />
        <TextInput
          label="Repita a senha"
          type="password"
          lightLabel
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createUser();
            }
          }}
        />
        <Container
          width="80%"
          height="10%"
          direction="row"
          gap="12px"
          backgroundColor="transparent"
          overflow="none"
        >
          <Button
            label="Cancelar"
            color={Color.Red}
            onClick={() => navigate(encodeURL(['home']))}
          />
          <Button
            label="Finalizar"
            color={Color.Green}
            onClick={() => createUser()}
          />
        </Container>
      </Container>
    </>
  );
};
