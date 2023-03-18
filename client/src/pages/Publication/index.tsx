import { Button } from '@components/button';
import { BodyText, Color, H2, MiniLabel } from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PublicationStyle } from './style';

import { apiJSON } from '../../libs/api';

interface commentTypes {
  author: string;
  comment: string;
}
interface likeTypes {
  author: string;
}

interface PublicationTypes {
  owner: string;
  title: string;
  description: string;
  playersAmount: number;
  playersLimit: number;
  likes: likeTypes[];
  comments: commentTypes[];
}

export const Publication = () => {
  const navigate = useNavigate();
  const [publication, setPublication] = useState<PublicationTypes>({
    owner: '',
    title: 'titulo',
    description: 'INSERINDO SUA DESCRIÇÃO...',
    playersAmount: 0,
    playersLimit: 0,
    likes: [],
    comments: [],
  });

  async function getPublication() {
    const { data } = await apiJSON.get<PublicationTypes>('/feed-room/:id');
    setPublication(data);
  }

  useEffect(() => {
    getPublication();
  }, []);

  return (
    <>
      <Header></Header>
      <PublicationStyle>
        <Container
          height="250px"
          justify="start"
          padding="0 30px 30px 30px"
          gap="12px"
        >
          <>
            <Container
              backgroundColor={Color.Background.base}
              height={'fit-content'}
              justify={'center'}
              padding={'10px 16px'}
              gap={'12px'}
            >
              <Container
                backgroundColor="transparent"
                justify="space-between"
                align="center"
                direction="row"
                height="10%"
                overflow="none"
              >
                <H2>{publication?.title}</H2>
                <div
                  style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}
                >
                  <H2>
                    {publication?.playersAmount}/{publication?.playersLimit}
                  </H2>
                  <X
                    size={22}
                    color={Color.Black.base}
                    onClick={() => navigate(-1)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.cursor = 'pointer';
                    }}
                  />
                </div>
              </Container>
              <Container
                height="50%"
                width="100%"
                backgroundColor="transparent"
                justify="start"
                align="start"
                border={`solid ${Color.Coal.base} 1px`}
                padding="8px"
                overflow="auto"
              >
                <BodyText>{publication?.description}</BodyText>
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
                  <MiniLabel> {publication?.likes.length} Curtidas</MiniLabel>
                </span>
                <span>
                  <Button label="Comentar" color={Color.Brown} />
                  <MiniLabel>
                    {publication?.comments.length} Comentários
                  </MiniLabel>
                </span>

                <Button label="Entrar" color={Color.Gold} onClick={() => navigate(`/chat-room/${setPublication}`) } />
              </Container>

              <Container
                padding="0px"
                height={publication.comments.length > 0 ? '30px' : '0px'}
                justify="start"
                align="start"
              >
                <H2>{publication.comments.length > 0 && 'Comentários'}</H2>
              </Container>
              <>
                {publication?.comments.map((comment) => {
                  return (
                    <Container
                      height="fit-content"
                      justify="start"
                      align="start"
                      gap="8px"
                      padding="8px"
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          width: '100%',
                        }}
                      >
                        <span>
                          <Button label={comment.author} color={Color.Grey} />
                        </span>

                        <div
                          style={{
                            padding: '8px',
                            border: `solid ${Color.Coal.base} 1px`,
                            borderRadius: '8px',
                            width: '100%',
                          }}
                        >
                          <BodyText>{comment?.comment}</BodyText>
                        </div>
                      </div>
                    </Container>
                  );
                })}
              </>
            </Container>
          </>
        </Container>
      </PublicationStyle>
    </>
  );
};
