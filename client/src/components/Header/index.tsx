import { BodyText, H1 } from '../common/typography';
import { HeaderLogo, HeaderStyle } from './style';
import { Logo } from '../../assets/icons/logo';
import { Button } from '../Button';

interface PropTypes {
    children?: JSX.Element | JSX.Element[];
}

export const Header = ({children}: PropTypes) => {
  return (
    <HeaderStyle>
      <HeaderLogo>
        <Logo />
        <H1 light>Chat RPG</H1>
      </HeaderLogo>
      {children}
    </HeaderStyle>
  );
};
