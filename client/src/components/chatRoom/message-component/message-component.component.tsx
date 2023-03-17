import { MessageComponentWrapper } from './message-component.styled';
import { BodyText, Label } from '../../common';

interface MessageComponentProps {
  body: string;
  author: string;
}

export const MessageComponent = ({body, author}: MessageComponentProps) => {
  return (
    <MessageComponentWrapper>
      <Label light>{author}</Label>
      <BodyText light>{body}</BodyText>
    </MessageComponentWrapper>
  );
}