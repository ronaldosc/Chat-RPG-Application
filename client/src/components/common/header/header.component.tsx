import { Logo } from '@assets/icons';
import { Color, H1, H2 } from '@components/common';
import { encodeURL } from '@helpers';
import { useUser } from '@providers';
import { GameController, House, SignOut } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common/button';
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
        <H2 light>Chat RPG</H2>
      </HeaderLogo>
      <Button
        color={Color.Gold}
        icon={<House size={22} color={Color.White.base} />}
        onClick={() => navigate(encodeURL(['feed']))}
      />
      <Button
        color={Color.Green}
        icon={<GameController size={22} color={Color.White.base} />}
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
