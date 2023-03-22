import { Button } from '@components/button';
import { ChatInput, ChatLounge, MessageComponent } from '@components/chatRoom';
import { Color, H1, H2, Modal, SelectInput } from '@components/common';
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
      setIsEnlisted(true);
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
    } catch (err) {
      console.warn(err);
    }
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
          <>
            {isEnlisted ? (
              <>
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
