import { ColorType, Label } from '@components/common';
import { ButtonStyle } from './button.styled';

interface PropTypes {
  label?: string | null;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  color: ColorType;
  icon?: JSX.Element | string;
  gap?: string;
}

export const Button = ({ label, onClick, color, icon, gap }: PropTypes) => {
  return (
    <ButtonStyle
      baseColor={color.base}
      hoverColor={color.hover}
      value={'Label'}
      onClick={onClick}
      gap={gap}
    >
      {label && (
        <Label light medium>
          {label}
        </Label>
      )}
      {icon}
    </ButtonStyle>
  );
};
