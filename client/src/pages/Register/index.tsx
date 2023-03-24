import { api } from '@api';
import { Logo } from '@assets/icons';
import { Button } from '@components/button';
import { Color, H1, TextInput } from '@components/common';
import { Container } from '@components/container';
import {
  encodeURL,
  customEnqueueSnackbar,
  regexInputValidator,
  anchorOrigin,
  transitionDurationDelayed,
} from '@helpers';
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
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const {
    email,
    password,
    contact: { userName },
  } = userProperties;

  const handleValidation = (): boolean => {
    if (!userName) {
      customEnqueueSnackbar('O usuário é obrigatório');
    }

    if (!email) {
      customEnqueueSnackbar('O e-mail é obrigatório');
    } else if (!regexInputValidator.emailRegex.test(email)) {
      customEnqueueSnackbar('Esse e-mail é inválido');
    }

    if (!password) {
      customEnqueueSnackbar('A senha é obrigatório');
    } else if (password !== repeatPassword) {
      enqueueSnackbar('As senhas não conferem');
    } else if (password.length < 8) {
      customEnqueueSnackbar('Psiu! Mínimo de 8 caracteres para a senha...');
    } else {
      return true;
    }
    return false;
  };

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRepeatPassword(event.target.value);
  };

  async function createUser() {

    if (!handleValidation()) {
      return;
    }

    try {
      await api.post('/user/signup', userProperties);
      customEnqueueSnackbar('Usuário criado e logado com sucesso!', 'success');
      if (signIn) {
        signIn({
          email,
          password,
        });
      }
      navigate(encodeURL(['feed']));
    } catch (error) {
      enqueueSnackbar('Há erros do formulário!', {
        variant: 'error',
        anchorOrigin: { ...anchorOrigin, horizontal: 'right' },
        transitionDuration: transitionDurationDelayed,
      });
    }
  }

  return (
    <>
      <Container
        width="90vw"
        height="90vh"
        gap="15px"
        backgroundColor="rgba(31, 25, 35, .5)"
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
          maxLength={22}
          onChange={(e) => {
            setUserProperties({
              ...userProperties,
              contact: { userName: e.target.value },
            });
          }}
          required
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
          required
        />
        <TextInput
          label="Senha"
          type="password"
          lightLabel
          name="password"
          onChange={(e) => {
            setUserProperties({
              ...userProperties,
              password: e.target.value,
            });
          }}
          required
        />
        <TextInput
          label="Repita a senha"
          type="password"
          lightLabel
          name="confirmPassword"
          onChange={handleRepeatPasswordChange}
        />
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
