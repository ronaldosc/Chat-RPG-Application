import { Logo } from '@assets/icons';
import { Color } from '@componentes/common';
import { H1 } from '@components/common';
import { encodeURL } from '@helpers';
import { useUser } from '@providers';
import { useSnackbar } from 'notistack';
import { House, SignOut } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { HeaderLogo, HeaderStyle } from './header.styled';

interface PropTypes {
  children?: JSX.Element | JSX.Element[];
}

export const Header = ({ children }: PropTypes) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
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
            size={22}
            color={Color.White.base}
            onClick={() => navigate(encodeURL(['feed']))}
          />
        }
      />
      <Button
        color={Color.Red}
        icon={<SignOut size={22} color={Color.White.base} />}
        onClick={() => {
          logout && logout();
        }}
      />
      {children}
    </HeaderStyle>
  );
};
