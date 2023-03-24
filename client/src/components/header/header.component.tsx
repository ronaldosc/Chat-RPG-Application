import { Logo } from '@assets/icons';
import { Color, H1 } from '@components/common';
import { encodeURL } from '@helpers';
import { useUser, useWebSocket } from '@providers';
import { useSnackbar } from 'notistack';
import { House, SignOut, GameController as Joystick} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/button';
import { HeaderLogo, HeaderStyle } from './header.styled';

interface PropTypes {
  children?: JSX.Element | JSX.Element[];
}

export const Header = ({ children }: PropTypes) => {
  const navigate = useNavigate();
  const { logout } = useUser();

  return (
    <HeaderStyle>
      <HeaderLogo>
        <Logo />
        <H1 light>Chat RPG</H1>
      </HeaderLogo>
      <Button
        color={Color.Gold}
        icon={
          <House
            weight="bold"
            size={22}
            color={Color.White.base}
            onClick={() => navigate(encodeURL(['feed']))}
          />
        }
      />
      <Button
        color={Color.Green}
        icon={<Joystick  weight="bold" size={22} color={Color.White.base} />}
        onClick={() => navigate(encodeURL(['my-games']))}
      />
      <Button
        color={Color.Red}
        icon={<SignOut weight="bold" size={22} color={Color.White.base} />}
        onClick={() => {
          if (logout) logout();
        }}
      />
      {children}
    </HeaderStyle>
  );
};
