import { BorderRadius, Color } from '@components/common';
import styled from 'styled-components';

export const MessageComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 2px;
  border-radius: ${BorderRadius.Medium};

  max-width: 100%;
  overflow-wrap: break-word;
  background: ${Color.Grey.base};
`;
