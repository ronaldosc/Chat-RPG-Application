import { Button } from '@components/button';
import { ChatInput, ChatLounge, MessageComponent } from '@components/chatRoom';
import { Color, H1 } from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import React from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../libs/api';

interface Message {
  author: string;
  body: string;
}

const FAKE_DATA = {
  roomTitle: 'Sala Genérica',
  userName: 'Eu',
};

interface ChatRoom {
  chatRoomId: string;
}

interface WSResponseTypes {
  action: string;
  data: {
    message: any;
  };
}

interface PlayerCharactersProps {
  characterId: number[];
  player: string;
  characterName: string;
}

interface ChatRoomTypes {
  data: {
    playerCharacters: PlayerCharactersProps[];
    feedMessageOrigin: string;
    owner: string;
    title: string;
    image: string;
    numberOfPlayers: number;
  };
}

export const ChatRoom = () => {
  const { id } = useParams();
  const [messageBody, setMessageBody] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [chatProprieties, setChatProprieties] = React.useState();

  async function getMessages() {
    const { data } = await api.get<ChatRoomTypes>(`/chatroom-id/${id}`);
    setMessages(data.data.messages);
  }

  const host = window.location.hostname;
  const ws = new WebSocket(`ws://${host}:5001`);

  React.useEffect(() => {
    getMessages();

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data.toString()) as WSResponseTypes;
      setMessages((oldMessages) => [...oldMessages, data.data.message]);
    };

    return () => {
      ws.close();
    };
  }, []);

  function sendMessage() {
    if (!messageBody) return null;
    const message = { author: FAKE_DATA.userName, body: messageBody };
    ws.send(JSON.stringify(message));

    setMessageBody('');
    return message;
  }

  return (
    <>
      <Header />
      <Container backgroundColor={Color.Background.base}>
        <H1>{FAKE_DATA.roomTitle}</H1>
        <ChatLounge>
          {messages.map((element, index) => {
            return (
              <MessageComponent
                key={index}
                body={element.body}
                author={element.author}
              />
            );
          })}
        </ChatLounge>
        <Container height={'fit-content'}>
          <ChatInput
            type="text"
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
          />
          <Button onClick={sendMessage} color={Color.Green} label={'Enviar'} />
        </Container>
      </Container>
    </>
  );
};
