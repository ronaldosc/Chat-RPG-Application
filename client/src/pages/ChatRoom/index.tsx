import { Button } from '@components/button';
import { ChatInput, ChatLounge, MessageComponent } from '@components/chatRoom';
import { Color, H1 } from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import React from 'react';

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
