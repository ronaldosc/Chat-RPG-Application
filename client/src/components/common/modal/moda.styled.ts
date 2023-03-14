import styled from 'styled-components';
import { Color } from '../constants';

export const ModalBackground = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0 ,0, 0, 0.5);
`;

export const ModalWrapper = styled.div`
  background: ${Color.Background};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 16px;
`;