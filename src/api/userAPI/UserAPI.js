import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
import { createHeaders } from '..';
const URL = process.env.REACT_APP_URL;

export const createUserAPI = (payload) => {
  return axios.post(`${URL}users/createUser`, payload, {
    headers: createHeaders()
  });
};

export const loginAPI = (payload) => {
  return axios.get(`${URL}users/login`, {
    params: payload,
    headers: createHeaders()
  });
};

export const wishListAPI = () => {
  return axios.get(`${URL}users/wishList`, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    })
  });
};

export const createOtpAPI = (payload) => {
  return axios.post(`${URL}users/createOtp`, payload, {
    headers: createHeaders()
  });
};

export const editAccountAPI = (payload) => {
  return axios.post(`${URL}users/editAccount`, payload, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    })
  });
};

export const getPasswordAPI = (payload) => {
  return axios.post(`${URL}users/getPassword`, payload, {
    headers: createHeaders()
  });
};

export const sendCreateAccountOTPAPI = (payload) => {
  return axios.post(`${URL}users/sendCreateAccountOTP`, payload, {
    headers: createHeaders()
  });
};
