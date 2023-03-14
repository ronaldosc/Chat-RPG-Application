import styled from 'styled-components';


import { Color, ColorType } from '../common/constants';

interface ButtonTypes {
  baseColor: string;
  hoverColor: string;
  gap?: string;
}

export const ButtonStyle = styled.button<ButtonTypes>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.baseColor};
  color: ${Color.White.base};
  border: solid rgba(0, 0, 0, 0.1) 2px;
  border-radius: 8px;
  height: 30px;
  padding: 0 18px;
  gap: ${(props) => props.gap || '4px'};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.hoverColor};
  }
`;
