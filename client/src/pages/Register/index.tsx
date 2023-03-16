import { useNavigate } from 'react-router-dom';

import { Color } from '../../components/common/constants';
import { useSnackbar } from 'notistack';
import { Button } from '../../components/Button/index';
import {
  BodyText,
  H1,
} from '../../components/common/typography/typography-components.component';
import { Container } from '../../components/Container';
import { Logo } from '../../assets/icons/logo';
import { encodeURL } from '../../helpers/URLNavigationReplace';
import { TextInput } from '../../components/common/inputs';
import { api } from '../../libs/api';
import { useState } from 'react';
import { useUser } from '../../providers/UserProvider';

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

  async function createUser() {
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
          label="Username"
          lightLabel
          onChange={(e) => {
            setUserProperties({
              ...userProperties,
              contact: { userName: e.target.value },
            });
          }}
        />
        <TextInput
          label="Email"
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
        <TextInput label="Confirmar senha" type="password" lightLabel />
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
