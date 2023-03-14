import { useNavigate } from 'react-router-dom';

import { Color } from '../../components/common/constants';
import { House } from '@phosphor-icons/react';
import { Button } from '../../components/Button/index';
import {
  BodyText,
  H1,
} from '../../components/common/typography/typography-components.component';
import { Header } from '../../components/Header';
import { Container } from '../../components/Container';
import { Logo } from '../../assets/icons/logo';
import { encodeURL } from '../../helpers/URLNavigationReplace';
import { useEffect, useState } from 'react';
import { TextInput } from '../../components/common/inputs';

interface UserTypes {
  email: string;
  password: string;
  contact: {
    userName: string;
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

  return (
    <>
      <Container width="90vw" height="90vh" gap="12px" backgroundColor='rgba(31, 25, 35, 0.5)' padding='20px' justify='start'>
        <Logo width="95px" height="108px" />
        <H1 light>Chat RPG</H1>
        <TextInput label="Nome" lightLabel />
        <TextInput label="Sobrenome" lightLabel />
        <TextInput label="Username" lightLabel />
        <TextInput label="Email" type="email" lightLabel />
        <TextInput label="Senha" type="password" lightLabel />
        <TextInput label="Confirmar senha" type="password" lightLabel />
        <Container
          width="80%"
          height="10%"
          direction="row"
          gap="12px"
          backgroundColor="transparent"
          overflow='none'
        >
          <Button
            label="Fazer Login"
            color={Color.Green}
            onClick={() => navigate(encodeURL(['home']))}
          />
          <Button label="Cadastrar-se" color={Color.Gold} />
        </Container>
      </Container>
    </>
  );
};
