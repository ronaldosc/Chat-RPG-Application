import { Button } from '@components/common/button';
import { ChatInput, ChatLounge, MessageComponent } from '@components/chatRoom';
import { Color, H2, Modal, SelectInput } from '@components/common';
import { Container } from '@components/common/container';
import { Header } from '@components/common/header';
import { useWebSocket } from '@providers';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '@api';

interface ChatRoom {
  chatRoomId: string;
}

interface WSResponseTypes<T> {
  action: string;
  data: {
    chatRoom: string;
    message: T;
  };
}

interface PlayerCharactersProps {
  _id: string;
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

interface AvailableCharactersProps {
  data: {
    playerCharacters: PlayerCharactersProps[];
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

interface IsPlayerProps {
  message: string;
  data: boolean;
}

export const ChatRoom = () => {
  const websocket = useWebSocket();

  const { id } = useParams();
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [chatProprieties, setChatProprieties] = useState<ChatRoomTypes>();
  const [isEnlisted, setIsEnlisted] = useState<boolean>();
  const [availableCharacters, setAvailableCharacters] = useState<string[]>([
    '',
  ]);
  const [availableId, setAvailableId] = useState<number[]>([0]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [showModal, setShowModal] = useState(false);

  function Dice(param: string) {
    if (param === '!d4') {
      return Math.floor(Math.random() * 4) + 1;
    }
    if (param === '!d6') {
      return Math.floor(Math.random() * 6) + 1;
    }
    if (param === '!d12') {
      return Math.floor(Math.random() * 12) + 1;
    }
    if (param === '!d20') {
      return Math.floor(Math.random() * 20) + 1;
    }
  }

  async function isPlayer() {
    try {
      const { data } = await api.get<IsPlayerProps>(
        `/chat-room/check-player/${chatProprieties?._id}`,
      );
      setIsEnlisted(data.data);
    } catch (err) {
      console.warn(err);
    }
  }

  async function getChatRoom() {
    const { data } = await api.get<ResponseChatRoomTypes>(
      `/chat-room/chatroom-feed/${id}`,
    );

    setChatProprieties(data.chatRoomInfo);
    setMessages(data.messages.reverse());
  }

  async function getAvailableCharacters() {
    try {
      const { data } = await api.get<AvailableCharactersProps>(
        `chat-room/available-characters/${chatProprieties?._id}`,
      );
      console.log('personagens', data);

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
    } catch (err) {
      console.warn(err);
    }
  }

  async function addPlayer() {
    try {
      await api.put('/chat-room/chatroom-player', {
        chatRoomId: chatProprieties?._id,
        playerCharacterId:
          availableId[availableCharacters.indexOf(selectedCharacter)],
      });
      setShowModal(false);
      setIsEnlisted(true);
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    getChatRoom();
  }, []);

  useEffect(() => {
    if (chatProprieties) {
      isPlayer();

      if (websocket) {
        websocket.onmessage = (e) => {
          const data = JSON.parse(e.data.toString());

          switch (data.action) {
            case 'message':
              if (
                (data as WSResponseTypes<MessageTypes>).data.chatRoom ===
                chatProprieties?._id
              ) {
                setMessages((oldMessages) => [
                  data.data.message,
                  ...oldMessages,
                ]);
              }
              break;
            default:
          }
          console.log(data);
        };
      }
    }
  }, [chatProprieties]);

  async function sendMessage() {
    try {
      let message: string = messageBody;
      if (
        messageBody === '!d4' ||
        messageBody === '!d6' ||
        messageBody === '!d10' ||
        messageBody === '!d20'
      ) {
        message = `Lancei um dado e o resultado foi: ${Dice(messageBody)}`;
      }

      const { data } = await api.post<ResponseSendMessageTypes>(
        '/feed-chat/new-chatfeed',
        {
          chatRoomId: chatProprieties?._id,
          content: message,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          height: '100vh',
          gap: '16px',
        }}
      >
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
              <H2>Selecione seu personagem</H2>
              <SelectInput
                options={availableCharacters}
                onChange={(e) => {
                  setSelectedCharacter(e.target.value);
                }}
              />
              <>
                {selectedCharacter !== '' && (
                  <Button
                    color={Color.Green}
                    onClick={addPlayer}
                    label="Confirmar"
                  />
                )}
              </>
            </Container>
          </div>
        </Modal>
        <Container
          backgroundColor={Color.Background.base}
          gap="16px"
          padding="24px 10px"
          justify="start"
          height="fit-content"
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
            <>
              {isEnlisted ? (
                <>
                  <div
                    style={{
                      height: 'fit-content',
                      width: '100%',
                      display: 'flex',
                      gap: '8px',
                    }}
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
                  </div>
                </>
              ) : (
                <>
                  <div style={{ height: 'fit-content', width: '100%' }}>
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
      </div>
    </>
  );
};
