import { api } from '@api';
import { Button } from '@components/button';
import { BodyText, Color, H2, MiniLabel } from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import { encodeURL } from '@helpers';
import { Plus } from 'phosphor-react';
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

interface LikeResponseTypes {
  message: string;
  data: {
    newLike: LikeTypes;
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

  async function getPublications() {
    const { data } = await api.get<ResponseTypes>('/feed-room');
    console.log(data);

    setPublications(data.data.feeds);
  }

  async function likeFeed(feedId: string) {
    const { data } = await api.post<LikeResponseTypes>('/reaction/like', {
      feedMessage: feedId,
    });
    setPublications((oldPublications) => {
      const newPublications = oldPublications.map((publication) => {
        if (publication._id === feedId) {
          return {
            ...publication,
            likes: Array.isArray(publication.likes)
              ? [
                  ...publication.likes,
                  {
                    author: data.data.newLike.author,
                    feedMessage: data.data.newLike.feedMessage,
                  },
                ]
              : [
                  {
                    author: data.data.newLike.author,
                    feedMessage: data.data.newLike.feedMessage,
                  },
                ],
            numberOfLikes: publication.numberOfLikes + 1,
          };
        }
        return publication;
      });
      return newPublications;
    });

    console.log(data);
  }
  console.log(document.cookie);
  useEffect(() => {
    const host = window.location.hostname;
    const ws = new WebSocket(`ws://${host}:5001`);

    getPublications();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data.toString());

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
          break;
        case 'dislike-feed':
          break;
        default:
      }
    };

    return () => {
      ws.close();
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

        <Container
          height=""
          justify="end"
          padding="0 30px 30px 30px"
          gap="12px"
        >
          {publications.map((publication: PublicationTypes, index) => (
            <React.Fragment key={index}>
              <Container
                backgroundColor={Color.Background.base}
                height={'250px'}
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
