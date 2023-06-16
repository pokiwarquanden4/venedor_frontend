import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const getJWTToken = () => {
  return `Bearer ${cookies.get('jwt_token') || cookies.get('jwt_refresh_token')}`;
};
