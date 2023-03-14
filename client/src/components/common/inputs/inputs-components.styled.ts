import styled from 'styled-components';
import {
  BorderRadius,
  Color,
  FontFamily,
  FontSizeDesktop,
} from '../constants';

import SelectArrowDown from '../../../assets/icons/select-arrow-down';

interface TextFieldProps {
  width?: number;
}

export interface TextAreaProps extends TextFieldProps {
  height?: number;
}

export const TextField = styled.input<TextFieldProps>`
  font-family: ${FontFamily.Primary};
  font-size: ${FontSizeDesktop.Medium};
  border: 1px solid ${Color.Black.base};
  border-radius: ${BorderRadius.Medium};
  background: ${Color.White.base};
  height: 30px;
  padding: 0 5px;
  width: ${({ width }) => width ?? 240}px;
  outline: none;
`;

export const TextArea = styled.textarea<TextAreaProps>`
  font-family: ${FontFamily.Primary};
  font-size: ${FontSizeDesktop.Medium};
  border: 1px solid ${Color.Black.base};
  border-radius: ${BorderRadius.Medium};
  background: ${Color.White.base};
  width: ${({ width }) => width ?? 240}px;
  height: ${({ height }) => height ?? 90}px;
  resize: none;
  outline: none;
`;

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectWrapper = styled.div`
  position: relative;
  padding: 4px;
  border: 1px solid ${Color.Black.base};
  border-radius: ${BorderRadius.Medium};
  width: fit-content;
  background: ${Color.White.base};
`;

export const SelectStyled = styled.select`
  background: none;
  border: none;
  appearance: none;
  outline: none;
`;

export const SelectIconStyled = styled(SelectArrowDown)`
  position: absolute;
`;
