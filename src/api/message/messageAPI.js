import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
const URL = process.env.REACT_APP_URL;

export const createRoomChatAPI = (payload) => {
  return axios.post(`${URL}users/createRoomChat`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const getAllRoomChatAPI = (payload) => {
  return axios.get(`${URL}users/getAllRoomChat`, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const getMessageByRoomChatAPI = (payload) => {
  return axios.get(`${URL}users/getMessageByRoomChat`, {
    params: payload,
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const callChatbotAPI = (payload) => {
  return axios.post(`${URL}users/askAI`, payload);
};
