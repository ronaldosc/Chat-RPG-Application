import { Color } from '../../components/common/constants';
import { Container } from '../../components/container';

export const Error404 = () => {
  return (
    <Container backgroundColor={Color.Background.base} height="60vh">
      <h1>Página não encontrada</h1>
    </Container>
  );
};
