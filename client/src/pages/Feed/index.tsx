import { api } from '@api';
import { Button } from '@components/button';
import { BodyText, Color, H2, MiniLabel } from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import { encodeURL } from '@helpers';
import { Plus } from 'phosphor-react';
import { useWebSocket } from 'providers/WebSocketProvider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedStyle } from './style';

interface commentTypes {
  author: string;
  comment: string;
}
interface likeTypes {
  author: string;
}

interface characterProps {
  characterId: number;
  characterName: string;
  player: string | null;
  _id: string;
}

interface OwnerTypes {
  _id: string;
  contact: {
    userName: string | null;
  };
}

interface PublicationTypes {
  _id: string;
  title: string;
  content: string;
  image: string | null;
  numberOfPlayers: number;
  numberOfLikes: number;
  numberOfComments: number;
  playerCharacters: characterProps[];
  likes: likeTypes[];
  comments: commentTypes[];
  owner: OwnerTypes | null;
}
interface ResponseTypes {
  message: string;
  data: {
    feeds: PublicationTypes[];
  };
}

interface LikeTypes {
  feedMessage: string;
  author: string;
}

export interface LikeResponseTypes {
  message: string;
  data: {
    newLike?: LikeTypes;
    removeLike?: LikeTypes;
  };
}

interface WSResponseTypes<T> {
  action: string;
  data: {
    chatRoom: string;
    message: T;
  };
}

export const Feed = () => {
  const navigate = useNavigate();
  const [publications, setPublications] = useState<PublicationTypes[]>([]);

  const websocket = useWebSocket();

  async function getPublications() {
    const { data } = await api.get<ResponseTypes>('/feed-room');
    console.log(data);

    setPublications(data.data.feeds);
  }

  async function likeFeed(feedId: string) {
    try {
      const { data } = await api.post<LikeResponseTypes>('/reaction/like', {
        feedMessage: feedId,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPublications();
    console.log(websocket);
    if (websocket)
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data.toString());
        console.log(data);

        switch (data.action) {
          case 'message':
            if (
              (data as WSResponseTypes<PublicationTypes>).data.chatRoom ===
              'feedRoom'
            ) {
              setPublications((oldPublications) => [
                data.data.message,
                ...oldPublications,
              ]);
              console.log(data);
            }
            break;
          case 'like-feed':
            setPublications((oldPublications) => {
              const newPublications = oldPublications.map((publication) => {
                if (publication._id === data.data.message.feedMessage) {
                  return {
                    ...publication,
                    likes: Array.isArray(publication.likes)
                      ? [
                          ...publication.likes,
                          { author: data.data.message.author },
                        ]
                      : [{ author: data.data.message.author }],
                    numberOfLikes: publication.numberOfLikes + 1,
                  };
                }
                return publication;
              });
              return newPublications;
            });

            break;
          case 'dislike-feed':
            setPublications((oldPublications) => {
              const newPublications = oldPublications.map((publication) => {
                if (publication._id === data.data.message.feedMessage) {
                  return {
                    ...publication,
                    likes: Array.isArray(publication.likes)
                      ? [
                          ...publication.likes,
                          { author: data.data.message.author },
                        ]
                      : [{ author: data.data.message.author }],
                    numberOfLikes: publication.numberOfLikes - 1,
                  };
                }
                return publication;
              });
              return newPublications;
            });
            break;
          default:
        }
      };
  }, []);

  return (
    <>
      <Header></Header>
      <FeedStyle>
        <Container height="50px">
          <Button
            label="Criar Publicação"
            icon={<Plus size={16} weight="bold" color={Color.White.base} />}
            color={Color.Brown}
            gap="8px"
            onClick={() => navigate(encodeURL(['create-game']))}
          />
        </Container>

        <Container height="" justify="end" padding="0 12px" gap="12px">
          {publications.map((publication: PublicationTypes, index) => (
            <React.Fragment key={index}>
              <Container
                backgroundColor={Color.Background.base}
                height={'300px'}
                justify={'space-between'}
                padding={'20px'}
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
                  <H2>{publication.title}</H2>
                  <H2>
                    {
                      publication.playerCharacters.filter(
                        (element) => element.player != null,
                      ).length
                    }
                    /{publication.numberOfPlayers}
                  </H2>
                </Container>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                  }}
                >
                  Mestre:{' '}
                  <Button
                    label={publication?.owner?.contact.userName}
                    color={Color.Coal}
                  />
                </div>
                <Container
                  height="50%"
                  backgroundColor="transparent"
                  justify="start"
                  align="start"
                  border={`solid ${Color.Coal.base} 1px`}
                  padding="8px"
                  overflow="auto"
                >
                  <BodyText>{publication.content}</BodyText>
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
                    <Button
                      label="Curtir"
                      color={Color.Green}
                      onClick={() => likeFeed(publication._id)}
                    />
                    <MiniLabel>{publication?.numberOfLikes} Curtidas</MiniLabel>
                  </span>
                  <span>
                    <Button
                      label="Comentar"
                      color={Color.Brown}
                      onClick={() =>
                        navigate(encodeURL(['publication', publication._id]))
                      }
                    />
                    <MiniLabel>
                      {publication?.numberOfComments} Comentários
                    </MiniLabel>
                  </span>

                  <Button
                    label="Entrar"
                    color={Color.Gold}
                    onClick={() =>
                      navigate(encodeURL(['chat-room', publication._id]))
                    }
                  />
                </Container>
              </Container>
            </React.Fragment>
          ))}
        </Container>
      </FeedStyle>
    </>
  );
};
