import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const jwtCheck = (obj) => {
  if (obj.data.accessToken) {
    cookies.set('jwt_token', obj.data.accessToken, {
      expires: new Date(jwt_decode(obj.data.accessToken).exp * 1000),
    });
  }
  if (obj.data.refreshToken) {
    cookies.set('jwt_refresh_token', obj.data.refreshToken, {
      expires: new Date(jwt_decode(obj.data.refreshToken).exp * 1000),
    });
  }
};

export const removeJWT = () => {
  cookies.remove('jwt_token');
  cookies.remove('jwt_refresh_token');
};
