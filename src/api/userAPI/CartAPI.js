import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
import { createHeaders } from '..';
const URL = process.env.REACT_APP_URL;

export const getCartProductAPI = (payload) => {
  return axios.get(`${URL}users/getCartProduct`, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

export const deleteCartProductAPI = (payload) => {
  return axios.post(`${URL}users/deleteCartProduct`, payload, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

export const createCartProductAPI = (payload) => {
  return axios.post(`${URL}users/createCartProduct`, payload, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

export const editCartProductAPI = (payload) => {
  return axios.post(`${URL}users/editCartProduct`, payload, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

