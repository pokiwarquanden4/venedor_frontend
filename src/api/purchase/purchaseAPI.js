import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
import { createHeaders } from '..';
const URL = process.env.REACT_APP_URL;

export const purchaseAPI = (payload) => {
  return axios.post(`${URL}users/purchase`, payload, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

