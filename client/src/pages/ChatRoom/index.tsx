import React from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import {
    ChatInput,
    ChatLounge,
    MessageComponent,
} from '../../components/chatRoom';
import { Color } from '../../components/common/constants';
import { H1 } from '../../components/common/typography';
import { Container } from '../../components/container';

interface Message {
  author: string;
  body: string;
}

const FAKE_DATA = {
  roomTitle: 'Sala Genérica',
  userName: 'Eu',
};

export const ChatRoom = () => {
  const [messageBody, setMessageBody] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([]);

  function sendMessage() {
    if (!messageBody) return null;
    const message = { author: FAKE_DATA.userName, body: messageBody };

    setMessages([...messages, message]);
    setMessageBody('');
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
