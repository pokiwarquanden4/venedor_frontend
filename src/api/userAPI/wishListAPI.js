import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
import { createHeaders } from '..';
const URL = process.env.REACT_APP_URL;

export const getWishListAPI = (payload) => {
  const headers = createHeaders({
    Authorization: getJWTToken(),
  });
  return axios.get(`${URL}users/getWishList`, {
    params: payload,
    headers,
  });
};

export const createWishListAPI = (payload) => {
  const headers = createHeaders({
    Authorization: getJWTToken(),
  });
  return axios.post(`${URL}users/createWishList`, payload, {
    headers,
  });
};

export const deleteWishListAPI = (payload) => {
  const headers = createHeaders({
    Authorization: getJWTToken(),
  });
  return axios.post(`${URL}users/deleteWishList`, payload, {
    headers,
  });
};

export const deleteAllWishListAPI = (payload) => {
  const headers = createHeaders({
    Authorization: getJWTToken(),
  });
  return axios.post(`${URL}users/deleteAllWishList`, payload, {
    headers,
  });
};

