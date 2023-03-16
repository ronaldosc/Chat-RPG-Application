import * as JWT from 'jwt-decode';

export const verifyExpTime = (token: string) => {
  const { exp } = JWT.default(token) as {
    exp: number;
  };

  const expTime = exp * 1000;
  const currentTime = new Date().getTime();

  if (expTime <= currentTime) {
    return false;
  }
  return true;
};

export const decode = (token: string) => {
  const result = JWT.default(token);

  return result;
};
