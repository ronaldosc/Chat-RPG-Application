import { ColorType } from '../common/constants';
import { Label } from '../common/typography';
import { ButtonStyle } from './style';

interface PropTypes {
  label?: string;
  onClick?: () => void;
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
