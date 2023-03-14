import { Container } from '../../components/Container';
import { House, Plus } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { Color } from '../../components/common/constants';
import { Header } from '../../components/Header';
import { FeedStyle } from './style';
import {
  BodyText,
  H1,
  H2,
  MiniLabel,
} from '../../components/common/typography';
import { useEffect, useState } from 'react';
import { api, apiJSON } from '../../libs/api';
import { useNavigate } from 'react-router';
import { encodeURL } from '../../helpers/URLNavigationReplace';

interface PublicationTypes {
  title: string;
  description: string;
  playersAmount: number;
  playersLimit: number;
  likes: number;
  comments: number;
}

export const Feed = () => {
  const navigate = useNavigate();
  const [publications, setPublications] = useState<PublicationTypes[]>([]);

  async function getPublications() {
    const { data } = await apiJSON.get<PublicationTypes[]>('/publications');
    setPublications(data);
  }

  useEffect(() => {
    getPublications();
  }, []);

  return (
    <>
      <Header>
        <Button
          color={Color.Gold}
          icon={<House size={22} color={Color.White.base} />}
        />
      </Header>
      <Container height='50px'>
        <Button
          label="Criar Publicação"
          icon={<Plus size={16} weight="bold" color={Color.White.base} />}
          color={Color.Brown}
          gap="8px"
          onClick={() => navigate(encodeURL(['create-game']))}
        />
      </Container>

      <Container height="" justify="start" padding="0 30px 30px 30px" gap='12px'>
        {publications.map((publication) => (
          <>
            <Container
              backgroundColor={Color.Background.base}
              height={'250px'}
              justify={'center'}
              padding={'10px 16px'}
              gap={'12px'}
              overflow="none"
            >
              <Container
                backgroundColor="transparent"
                justify="space-between"
                align="center"
                direction="row"
                height="10%"
                overflow="none"
              >
                <H2>{publication.title}</H2>
                <H2>
                  {publication.playersAmount}/{publication.playersLimit}
                </H2>
              </Container>
              <Container
                height="50%"
                backgroundColor="transparent"
                justify="start"
                align="start"
                border={`solid ${Color.Coal.base} 1px`}
                padding="8px"
              >
                <BodyText>{publication.description}</BodyText>
              </Container>
              <Container
                direction="row"
                height="20%"
                gap="8px"
                backgroundColor="transparent"
                align="start"
                overflow="none"
              >
                <span>
                  <Button label="Curtir" color={Color.Green} />
                  <MiniLabel>{publication.likes} Curtidas</MiniLabel>
                </span>
                <span>
                  <Button label="Comentar" color={Color.Brown} />
                  <MiniLabel>{publication.comments} Comentários</MiniLabel>
                </span>

                <Button label="Entrar" color={Color.Gold} />
              </Container>
            </Container>
          </>
        ))}
      </Container>
    </>
  );
};
