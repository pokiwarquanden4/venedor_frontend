import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
const URL = process.env.REACT_APP_URL;

export const createUserAPI = (payload) => {
  return axios.post(`${URL}users/createUser`, payload);
};

export const loginAPI = (payload) => {
  return axios.post(`${URL}users/login`, payload);
};

export const wishListAPI = () => {
  return axios.get(`${URL}users/wishList`, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const createOtpAPI = (payload) => {
  return axios.post(`${URL}users/createOtp`, payload);
};

export const editAccountAPI = (payload) => {
  return axios.post(`${URL}users/editAccount`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const getPasswordAPI = (payload) => {
  return axios.post(`${URL}users/getPassword`, payload);
};
