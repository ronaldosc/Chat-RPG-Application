import { BodyText, H1 } from '../common/typography';
import { HeaderLogo, HeaderStyle } from './style';
import { Logo } from '../../assets/icons/logo';
import { Button } from '../Button';
import { House, SignOut } from 'phosphor-react';
import { Color } from '../common/constants';
import { useNavigate } from 'react-router-dom';
import { encodeURL } from '../../helpers/URLNavigationReplace';
import { useSnackbar } from 'notistack';
import { api } from '../../libs/api';
import { useUser } from '../../providers/UserProvider';

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
        onClick={() => {logout && logout()}}
      />
      {children}
    </HeaderStyle>
  );
};
