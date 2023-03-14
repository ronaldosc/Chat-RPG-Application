import { Label } from '../typography';
import {
  TextField,
  TextInputWrapper,
  TextArea,
  TextAreaProps,
  SelectStyled,
  SelectIconStyled,
  SelectWrapper,
} from './inputs-components.styled';

interface TextInputProps{
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  label: string;
  lightLabel?: boolean;

}

interface TextAreaInputProps extends TextAreaProps {
  label: string;
  lightLabel?: boolean;
}

interface SelectInputProps {
  options: { name: string }[];
}

export const TextInput = ({ type, label, placeholder, lightLabel }: TextInputProps) => {
  return (
    <TextInputWrapper>
      <Label light={lightLabel}>{label}</Label>
      <TextField type={type} placeholder={placeholder} />
    </TextInputWrapper>
  );
};

export const TextAreaInput = ({ label, height, width, lightLabel }: TextAreaInputProps) => {
  return (
    <TextInputWrapper>
      <Label light={lightLabel}>{label}</Label>
      <TextArea height={height} width={width} />
    </TextInputWrapper>
  );
};

export const SelectInput = ({ options }: SelectInputProps) => {

  return (
    <SelectWrapper>
      <SelectStyled>
        {options.map((element, index) => {
          return (
            <option key={index} value={element.name}>
              {element.name}
            </option>
          );
        })}
      </SelectStyled>
      <SelectIconStyled />
    </SelectWrapper>
  );
};
