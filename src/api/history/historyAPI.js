import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
const URL = process.env.REACT_APP_URL;

export const historyAPI = (payload) => {
  return axios.get(`${URL}users/getHistory`, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const oderAPI = (payload) => {
  return axios.get(`${URL}sellers/oder`, {
    params: payload,
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const editOderAPI = (payload) => {
  return axios.post(`${URL}sellers/editOrder`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const cancelOderAPI = (payload) => {
  return axios.post(`${URL}users/cancelOder`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};
