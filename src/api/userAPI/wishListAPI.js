import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
const URL = 'http://localhost:8000/';

export const getWishListAPI = (payload) => {
  return axios.get(`${URL}users/getWishList`, {
    params: payload,
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const createWishListAPI = (payload) => {
  return axios.post(`${URL}users/createWishList`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const deleteWishListAPI = (payload) => {
  return axios.post(`${URL}users/deleteWishList`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const deleteAllWishListAPI = (payload) => {
  return axios.post(`${URL}users/deleteAllWishList`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};
