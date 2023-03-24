import { api } from '@api';
import { Button } from '@components/button';
import { BodyText, Color, H1, H2 } from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import { encodeURL } from '@helpers';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatRoomTypes {
  _id: string;
  title: string;
  content: string;
  image: string | null;
  numberOfPlayers: number;
  playerCharacters: characterProps[];
  feedMessageOrigin: string;
  owner: string;
}

interface ResponseTypes {
  message: string;
  data: {
    chatRooms: ChatRoomTypes[];
  };
}

interface characterProps {
  characterId: number;
  characterName: string;
  player: string | null;
  _id: string;
}

export const MyGames = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState<ChatRoomTypes[]>([]);

  async function getChatRooms() {
    const { data } = await api.get<ResponseTypes>('/chat-room/chatroom-user');

    setChatRooms(data.data.chatRooms);
  }

  useEffect(() => {
    getChatRooms();
  }, []);

  return (
    <>
      <Header />
      <Container backgroundColor={Color.Background.base}>
        <>
          {chatRooms.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <H2>Você ainda não participa de nenhuma aventura :C </H2>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                width: '50%',
                justifyContent: 'center',
                padding: '16px 0 8px 0',

                marginBottom: '24px',
              }}
            >
              <H2>Meus Jogos</H2>
            </div>
          )}
        </>
        <>
          {chatRooms.map((element, index) => {
            return (
              <React.Fragment key={index}>
                <Container padding="16px" gap="16px">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'start',
                      width: '100%',
                    }}
                  >
                    <H2>{element.title}</H2>
                  </div>
                  <Container
                    border="solid 1px black"
                    justify="start"
                    align="start"
                    padding="16px"
                    height="200px"
                    overflow="auto"
                  >
                    <BodyText>{element.content}</BodyText>
                  </Container>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center ',
                    }}
                  >
                    <Button
                      label={'Entrar'}
                      color={Color.Gold}
                      onClick={() =>
                        navigate(`/chat-room/${element.feedMessageOrigin}`)
                      }
                    />
                  </div>
                </Container>
              </React.Fragment>
            );
          })}
        </>
      </Container>
    </>
  );
};
