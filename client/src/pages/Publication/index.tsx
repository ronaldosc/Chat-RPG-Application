import { Button } from '@components/button';
import { BodyText, Color, H2, MiniLabel } from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PublicationStyle } from './style';

import { api, apiJSON } from '../../libs/api';
import { ChatInput } from '../../components/chatRoom';

interface commentTypes {
  author: string;
  content: string;
}
interface likeTypes {
  author: string;
}

interface characterProps {
  characterId: number;
  characterName: string;
  player: string | null;
}

interface ResquestCommentType {
  feedMessage: string;
  comment: string;
}

interface PublicationTypes {
  _id: string;
  owner: string;
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

interface ResponsePublicationTypes {
  message: string;
  data: {
    feedMessage: PublicationTypes[];
    comments: commentTypes[];
  };
}

export const Publication = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [publication, setPublication] = useState<PublicationTypes>({
    _id: '',
    owner: '',
    title: '',
    content: '',
    image: null,
    numberOfPlayers: 0,
    numberOfLikes: 0,
    numberOfComments: 0,
    playerCharacters: [
      {
        characterId: 0,
        characterName: '',
        player: null,
      },
    ],
    likes: [],
    comments: [],
  });
  const [comments, setComments] = useState<commentTypes[]>([]);
  const [comment, setComment] = useState<string>('');

  async function sendComment() {
    try {
      const { data } = await api.post<ResquestCommentType>(
        '/feed-comment/new-comment',
        {
          feedMessage: id,
          content: comment,
        },
      );
      getPublication();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPublication() {
    try {
      const { data } = await api.get<ResponsePublicationTypes>(
        `/feed-room/${id}`,
      );
      setPublication(data.data.feedMessage[0]);
      setComments(data.data.comments);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPublication();
  }, []);

  return (
    <>
      <Header></Header>
      <PublicationStyle>
        <Container height="250px" justify="start" gap="12px">
          <>
            <Container
              backgroundColor={Color.Background.base}
              height="fit-content"
              justify="center"
              padding="16px 16px"
              gap="16px"
            >
              <Container
                backgroundColor="transparent"
                justify="space-between"
                align="center"
                direction="row"
                height="15%"
                overflow="none"
              >
                <H2>{publication?.title}</H2>
                <div
                  style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}
                >
                  <H2></H2>
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
                <BodyText>{publication?.content}</BodyText>
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
                  <MiniLabel> {publication.numberOfLikes} Curtidas</MiniLabel>
                </span>
                <span>
                  <Button label="Comentar" color={Color.Brown} />
                  <MiniLabel>
                    {publication.numberOfComments} Comentários
                  </MiniLabel>
                </span>

                <Button
                  label="Entrar"
                  color={Color.Gold}
                  onClick={() => navigate(`/chat-room/${publication._id}`)}
                />
              </Container>

              <Container
                padding="0px"
                height={publication.numberOfComments > 0 ? '30px' : '0px'}
                justify="start"
                align="start"
                margin="30px 0px 0px 0px"
              >
                <H2>{publication?.comments?.length > 0 && 'Comentários'}</H2>
              </Container>
              <>
                {comments?.map((comment) => {
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
                          <BodyText>{comment?.content}</BodyText>
                        </div>
                      </div>
                    </Container>
                  );
                })}
              </>
              <Container
                height="fit-content"
                direction="row"
                gap="8px"
                justify="space-between"
              >
                <ChatInput
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  color={Color.Green}
                  label={'Enviar'}
                  onClick={() => sendComment()}
                />
              </Container>
            </Container>
          </>
        </Container>
      </PublicationStyle>
    </>
  );
};
