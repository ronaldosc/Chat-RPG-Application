import styled from 'styled-components';
import { BorderRadius, Color, FontFamily, FontSizeDesktop } from '../constants';

interface TextFieldProps {
  width?: string;
}

export interface TextAreaProps extends TextFieldProps {
  height?: number;
  width?: string;
}

export const TextField = styled.input<TextFieldProps>`
  font-family: ${FontFamily.Primary};
  font-size: ${FontSizeDesktop.Medium};
  border: 1px solid ${Color.Black.base};
  border-radius: ${BorderRadius.Medium};
  background: ${Color.White.base};
  height: 30px;
  padding: 0 5px;
  width: ${({ width }) => width ?? '100%'};
  outline: none;
`;

export const TextArea = styled.textarea<TextAreaProps>`
  font-family: ${FontFamily.Primary};
  font-size: ${FontSizeDesktop.Medium};
  border: 1px solid ${Color.Black.base};
  border-radius: ${BorderRadius.Medium};
  background: ${Color.White.base};
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? 90}px;
  padding: 5px;
  resize: none;
  outline: none;
`;

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectStyled = styled.select`
  border: none;
  outline: none;
  position: relative;
  padding: 4px;
  border: 1px solid ${Color.Black.base};
  border-radius: ${BorderRadius.Medium};
  height: 30px;
  width: fit-content;
  background: ${Color.White.base};
`;
