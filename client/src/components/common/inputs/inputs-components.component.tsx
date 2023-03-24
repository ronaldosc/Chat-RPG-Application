import { Label } from '../typography';
import {
  SelectStyled,
  TextArea,
  TextAreaProps,
  TextField,
  TextInputWrapper,
} from './inputs-components.styled';

type RegexInput = {
  emailValidator: '/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/';
  passwordValidator: '/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/';
};

export interface TextInputProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  label?: string;
  lightLabel?: boolean;
  pattern?: keyof RegexInput;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: true;
}

interface TextAreaInputProps extends TextAreaProps {
  label: string;
  lightLabel?: boolean;
}

interface SelectInputProps {
  options: string[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const TextInput = ({
  type,
  label,
  placeholder,
  lightLabel,
  pattern,
  maxLength,
  onChange,
  onBlur,
  onKeyDown,
  required,
}: TextInputProps) => {
  return (
    <TextInputWrapper>
      <Label light={lightLabel}>{label}</Label>
      <TextField
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        required={required}
      />
    </TextInputWrapper>
  );
};

export const TextAreaInput = ({
  label,
  height,
  width,
  lightLabel,
}: TextAreaInputProps) => {
  return (
    <TextInputWrapper>
      <Label light={lightLabel}>{label}</Label>
      <TextArea height={height} width={width} />
    </TextInputWrapper>
  );
};

export const SelectInput = ({ options, onChange }: SelectInputProps) => {
  return (
    <SelectStyled onChange={onChange}>
      <option disabled selected value={'null'}>
        Selecionar
      </option>
      {options.map((element, index) => {
        return (
          <option key={index} value={element}>
            {element}
          </option>
        );
      })}
    </SelectStyled>
  );
};
