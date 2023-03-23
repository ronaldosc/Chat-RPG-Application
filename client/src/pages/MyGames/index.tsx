import { api } from '@api';
import { Button } from '@components/common/button';
import { BodyText, Color, H1, H2 } from '@components/common';
import { Container } from '@components/common/container';
import { Header } from '@components/common/header';
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
            <H1>Você ainda não participa de nenhuma aventura :C </H1>
          ) : (
            <H1>Meus Jogos</H1>
          )}
        </>
        <>
          {chatRooms.map((element, index) => {
            return (
              <React.Fragment key={index}>
                <Container>
                  <H2>{element.title}</H2>
                  <Container border="solid 1px black">
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
