import { Navigate, Route, Routes } from 'react-router-dom';

import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { Feed } from '../pages/Feed';
import { CreateGame } from '../pages/CreateGame';
import { ReactElement } from 'react';
import { useUser } from '../providers/UserProvider';
import { Error404 } from '../pages/Error404';

interface ChildrenTypes {
  children: ReactElement;
}

const Private = ({ children }: ChildrenTypes) => {
  const { token } = useUser();
  if (!token) {
    return <Navigate to={'/home'} />;
  }
  return children;
};

const Public = ({ children }: ChildrenTypes) => {
  const { token } = useUser();
  if (token) {
    return <Navigate to={'/feed'} />;
  }
  return children;
};

export const Router = () => {

  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<Navigate to="/home" />} />

      <Route
        path="/home"
        element={
          <Public>
            <Home />
          </Public>
        }
      />

      <Route
        path="/register"
        element={
          <Public>
            <Register />
          </Public>
        }
      />

      <Route
        path="/feed"
        element={
          <Private>
            <Feed />
          </Private>
        }
      />

      <Route
        path="/create-game"
        element={
          <Private>
            <CreateGame />
          </Private>
        }
      />
    </Routes>
  );
};
