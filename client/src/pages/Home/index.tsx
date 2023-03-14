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

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container width="90vw" height="60vh" gap="12px" backgroundColor='rgba(31, 25, 35, 0.5)'>
      <Logo width="95px" height="108px" />
      <H1 light>Chat RPG</H1>
      <TextInput placeholder="Email" label="E-mail" lightLabel />
      <TextInput placeholder="Senha" label="Senha" type="password" lightLabel />
      <Container
        width="80%"
        height="10%"
        direction="row"
        gap="12px"
        backgroundColor="transparent"
      >
        <Button label="Login" color={Color.Green} />
        <Button
          label="Register"
          color={Color.Gold}
          onClick={() => navigate(encodeURL(['register']))}
        />
      </Container>
    </Container>
  );
};
