import { Color } from '@components/common';
import styled from 'styled-components';

export const ChatLounge = styled.div`
  padding: 10px;
  height: 400px;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 10px;

  overflow-y: auto;
  border: 1px ${Color.Black.base} solid;
`;
