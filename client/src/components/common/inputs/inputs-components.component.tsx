import { Label } from '../typography';
import {
  TextField,
  TextInputWrapper,
  TextArea,
  TextAreaProps,
  SelectStyled,
} from './inputs-components.styled';

interface TextInputProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  label?: string;
  lightLabel?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
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
  onChange,
  onBlur,
}: TextInputProps) => {
  return (
    <TextInputWrapper>
      <Label light={lightLabel}>{label}</Label>
      <TextField
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
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
