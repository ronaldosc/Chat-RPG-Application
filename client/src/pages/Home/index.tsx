import { Logo } from '@assets/icons';
import { Button } from '@components/button';
import { Color, H1, TextInput } from '@components/common';
import { Container } from '@components/container';
import { encodeURL } from '@helpers';
import { useUser } from '@providers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginTypes {
  email: string;
  password: string;
}

export const Home = () => {
  const navigate = useNavigate();

  const { signIn } = useUser();

  const [login, setLogin] = useState<LoginTypes>({
    email: '',
    password: '',
  });
  return (
    <Container
      width="80vw"
      height="65vh"
      gap="12px"
      backgroundColor="rgba(31, 25, 35, 0.6)"
    // TODO backgroundGradient='radial-gradient(circle, rgba(200, 25, 35, 0.5) 50%, rgba(1, 25, 35, 0.8) 20%)'
    >
      <Logo width="95px" height="180px" title="Logo Chat RPG" />
      <H1 light title="Bem vindo(a) ao Chat RPG">
        CHAT RPG
      </H1>
      <TextInput
        placeholder="Digite o e-mail cadastrado"
        label="E-mail"
        lightLabel
        onChange={(e) => setLogin({ ...login, email: e.target.value })}
      />
      <TextInput
        placeholder="Digite a senha de acesso"
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
          onClick={() => signIn && signIn(login)}
        />
        <Button
          label="Cadastrar"
          color={Color.Gold}
          onClick={() => navigate(encodeURL(['register']))}
        />
      </Container>
    </Container>
  );
};
