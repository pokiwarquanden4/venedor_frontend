import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
import { createHeaders } from '..';
const URL = process.env.REACT_APP_URL;

export const createRoomChatAPI = (payload) => {
  return axios.post(`${URL}users/createRoomChat`, payload, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

export const getAllRoomChatAPI = (payload) => {
  return axios.get(`${URL}users/getAllRoomChat`, {
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

export const getMessageByRoomChatAPI = (payload) => {
  return axios.get(`${URL}users/getMessageByRoomChat`, {
    params: payload,
    headers: createHeaders({
      Authorization: getJWTToken(),
    }),
  });
};

export const callChatbotAPI = (payload) => {
  // Trường hợp này không cần Authorization, nên chỉ cần ngrok-skip-browser-warning
  return axios.post(`${URL}users/askAI`, payload, {
    headers: createHeaders(),
  });
};

