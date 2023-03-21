import { Color } from '@components/common';
import styled from 'styled-components';

export const ChatLounge = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  overflow: auto;
  padding: 10px;
  width: 95%;
  gap: 10px;
  border: 1px ${Color.Black.base} solid;
`;
