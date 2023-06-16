import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
const URL = 'http://localhost:8000/';

export const purchaseAPI = (payload) => {
  return axios.post(`${URL}users/purchase`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};
