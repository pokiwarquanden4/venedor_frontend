import axios from 'axios';
import { getJWTToken } from '../authen/Authen';

const URL = process.env.REACT_APP_URL;

export const createAddressAPI = (payload) => {
  return axios.post(`${URL}users/createAddress`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const getAddressAPI = (payload) => {
  return axios.get(`${URL}users/getAddress`, {
    params: payload,
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const editAddressAPI = (payload) => {
  return axios.post(`${URL}users/editAddress`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const deleteAddressAPI = (payload) => {
  return axios.post(`${URL}users/deleteAddress`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};
