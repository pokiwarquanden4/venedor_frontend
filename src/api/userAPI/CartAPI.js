import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
const URL = 'http://localhost:8000/';

export const getCartProductAPI = (payload) => {
  return axios.get(`${URL}users/getCartProduct`, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const deleteCartProductAPI = (payload) => {
  return axios.post(`${URL}users/deleteCartProduct`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const createCartProductAPI = (payload) => {
  return axios.post(`${URL}users/createCartProduct`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const editCartProductAPI = (payload) => {
  return axios.post(`${URL}users/editCartProduct`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};
