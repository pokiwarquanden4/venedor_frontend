import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
import { createHeaders } from '..';
const URL = process.env.REACT_APP_URL;

export const historyAPI = (payload) => {
  return axios.get(`${URL}users/getHistory`, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

export const oderAPI = (payload) => {
  return axios.get(`${URL}sellers/oder`, {
    params: payload,
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

export const editOderAPI = (payload) => {
  return axios.post(`${URL}sellers/editOrder`, payload, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

export const cancelOderAPI = (payload) => {
  return axios.post(`${URL}users/cancelOder`, payload, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

