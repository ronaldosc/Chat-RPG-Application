import { Button } from '@components/button';
import { ChatInput, ChatLounge, MessageComponent } from '@components/chatRoom';
import { Color, H1, H2, Modal, SelectInput } from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../libs/api';

interface Message {
  author: string;
  body: string;
}

interface GetMessagesTypes {
  data: {
    chatMessage: Message[];
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
  _id: string;
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

interface AvailableCharactersProps {
  data: {
    playerCharacters: PlayerCharactersProps[];
  };
}

export const ChatRoom = () => {
  const { id } = useParams();
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatProprieties, setChatProprieties] = useState<ChatRoomTypes>();
  const [isEnlisted, setIsEnlisted] = useState<boolean>();
  const [availableCharacters, setAvailableCharacters] = useState<string[]>([
    '',
  ]);
  const [availableId, setAvailableId] = useState<number[]>([0]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ws, setWs] = useState<WebSocket>();

  async function getMessages() {
    const { data } = await api.get<GetMessagesTypes>(
      `/feed-chat/chatfeeds/${id}`,
    );
    setMessages(data.data.chatMessage);
  }

  async function getChatRoom() {
    const { data } = await api.get<ChatRoomTypes>(
      `/chat-room/chatroom-id/${id}`,
    );
    setChatProprieties(data);
  }

  async function getAvailableCharacters() {
    const { data } = await api.get<AvailableCharactersProps>(
      `/chat-room/available-characters/${id}`,
    );
    console.log(data);
    setAvailableCharacters(
      data.data.playerCharacters.map((element) => {
        return element.characterName;
      }),
    );
    setAvailableId(
      data.data.playerCharacters.map((element) => {
        return element.characterId[0];
      }),
    );
  }

  async function addPlayer() {
    try {
      await api.post('/chat-room/chatroom-player', {
        chatRoomId: id,
        playerCharacterId:
          availableId[availableCharacters.indexOf(selectedCharacter)],
      });
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    const host = window.location.hostname;
    const ws = new WebSocket(`ws://${host}:5001`);
    setWs(ws);
    getMessages();
    getChatRoom();

    ws.onopen = () => {
      console.log('Abriu');
    };

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
    console.log(message);
    if (ws) ws.send(JSON.stringify(message));

    setMessageBody('');
    return message;
  }

  return (
    <>
      <Header />
      <Modal showModal={showModal}>
        <div style={{ position: 'relative' }}>
          <Container
            backgroundColor={Color.White.base}
            width="400px"
            height="320px"
            gap="16px"
          >
            <div
              style={{
                position: 'absolute',
                right: '8px',
                top: '-8px',
                fontSize: '3rem',
                cursor: 'pointer',
              }}
              onClick={() => setShowModal(false)}
            >
              &times;
            </div>
            <H2>Seleciona seu personagem</H2>
            <SelectInput
              options={availableCharacters}
              onChange={(e) => {
                setSelectedCharacter(e.target.value);
              }}
            />
            <Button color={Color.Green} onClick={addPlayer} label="Confirmar" />
          </Container>
        </div>
      </Modal>
      <Container backgroundColor={Color.Background.base}>
        <H1>{chatProprieties?.data.title}</H1>
        <ChatLounge>
          {messages?.map((element, index) => {
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
          <>
            {isEnlisted ? (
              <>
                <ChatInput
                  type="text"
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                />
                <Button
                  onClick={sendMessage}
                  color={Color.Green}
                  label={'Enviar'}
                />
              </>
            ) : (
              <>
                <div style={{ height: '250px', width: '100%' }}>
                  <Button
                    label="Participar"
                    color={Color.Gold}
                    onClick={() => {
                      getAvailableCharacters();
                      setShowModal(true);
                    }}
                  />
                </div>
              </>
            )}
          </>
        </Container>
      </Container>
    </>
  );
};
