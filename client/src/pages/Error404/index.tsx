import { Color } from '../../components/common/constants';
import { Container } from '../../components/Container';

export const Error404 = () => {
  return (
    <Container backgroundColor={Color.Background.base} height="60vh">
      <h1>Página não existente</h1>
    </Container>
  );
};
