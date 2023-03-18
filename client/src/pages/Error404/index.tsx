import { Color, H1 } from '@components/common';
import { Container } from '@components/container';

export const Error404 = () => {
  return (
    <Container backgroundColor={Color.Background.base} height="60vh">
      <H1>Página não encontrada</H1>
    </Container>
  );
};
