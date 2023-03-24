import { BodyText, Color, Label } from '@components/common';
import { MessageComponentWrapper } from './message-component.styled';

interface MessageComponentProps {
  body: string;
  author: string | undefined;
}

export const MessageComponent = ({ body, author }: MessageComponentProps) => {
  return (
    <MessageComponentWrapper>
      <Label light style={{ color: `${Color.Gold.hover}` }}>
        {author}
      </Label>
      <BodyText light>{body}</BodyText>
    </MessageComponentWrapper>
  );
};
