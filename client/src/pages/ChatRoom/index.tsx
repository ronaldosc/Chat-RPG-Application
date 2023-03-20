import { Button } from '@components/button';
import { ChatInput, ChatLounge, MessageComponent } from '@components/chatRoom';
import { Color, H1 } from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../libs/api';

interface Message {
  author: string;
  body: string;
}

interface GetMessagesTypes {
  data: {
    messages: Message[];
  };
}

const FAKE_DATA = {
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
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatProprieties, setChatProprieties] = useState<ChatRoomTypes>();

  async function getMessages() {
    const { data } = await api.get<GetMessagesTypes>(
      `/feed-chat/chatfeeds/${id}`,
    );
    setMessages(data.data.messages);
  }

  async function getChatRoom() {
    const { data } = await api.get<ChatRoomTypes>(
      `chat-room/chatroom-id/${id}`,
    );
    setChatProprieties(data);
  }

  useEffect(() => {
    const host = window.location.hostname;
    const ws = new WebSocket(`ws://${host}:5001`);
    getMessages();
    getChatRoom();

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
        <H1>{chatProprieties?.data.title}</H1>
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
