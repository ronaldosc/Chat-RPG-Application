import { Button } from '@components/button';
import { ChatInput, ChatLounge, MessageComponent } from '@components/chatRoom';
import { Color, H1, H2 } from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import { useWebSocket } from 'providers/WebSocketProvider';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../libs/api';

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
  _id: string;
  playerCharacters: PlayerCharactersProps[];
  feedMessageOrigin: string;
  owner: string;
  title: string;
  image: string;
  numberOfPlayers: number;
}

interface ResponseSendMessageTypes {
  message: string;
  data: {
    newFeed: ChatRoomTypes;
  };
}

interface AuthorTypes {
  contact: {
    userName: string;
  };
  _id: string;
}

interface MessageTypes {
  _id: string;
  choices: [];
  chatRoomId: string;
  author: AuthorTypes | null;
  content: string;
  directedTo: null;
}

interface ResponseChatRoomTypes {
  messages: MessageTypes[];
  chatRoomInfo: ChatRoomTypes;
}

export const ChatRoom = () => {
  const websocket = useWebSocket();

  const { id } = useParams();
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [chatProprieties, setChatProprieties] = useState<ChatRoomTypes>();

  async function getChatRoom() {
    const { data } = await api.get<ResponseChatRoomTypes>(
      `/chat-room/chatroom-feed/${id}`,
    );

    setChatProprieties(data.chatRoomInfo);
    setMessages(data.messages.reverse());
  }

  useEffect(() => {
    getChatRoom();

    if (websocket) {
      websocket.onmessage = (e) => {
        const data = JSON.parse(e.data.toString()) as WSResponseTypes;
        console.log(data);

        setMessages((oldMessages) => [data.data.message, ...oldMessages]);
      };
    }
  }, []);

  async function sendMessage() {
    try {
      const { data } = await api.post<ResponseSendMessageTypes>(
        '/feed-chat/new-chatfeed',
        {
          chatRoomId: chatProprieties?._id,
          content: messageBody,
          image: null,
          directedTo: null,
          choices: [],
        },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />

      <Container
        backgroundColor={Color.Background.base}
        gap="16px"
        padding="10px"
      >
        <div style={{ marginTop: '10px' }}>
          <H2>{chatProprieties?.title}</H2>
        </div>

        <ChatLounge>
          {messages?.map((element, index) => {
            return (
              <MessageComponent
                key={index}
                body={element.content}
                author={element?.author?.contact?.userName}
              />
            );
          })}
        </ChatLounge>

        <Container
          height={'fit-content'}
          direction="row"
          justify="space-between"
          width="100%"
          padding="0 16px"
        >
          <ChatInput
            type="text"
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setMessageBody('');
                sendMessage();
              }
            }}
          />
          <Button
            onClick={() => {
              setMessageBody('');
              sendMessage();
            }}
            color={Color.Green}
            label={'Enviar'}
          />
        </Container>
      </Container>
    </>
  );
};
