import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
const URL = 'http://localhost:8000/';

export const addProductAPI = (payload) => {
  return axios.post(`${URL}sellers/createProduct`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const editProductAPI = (payload) => {
  return axios.post(`${URL}sellers/editProduct`, payload, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const getAllProductAPI = () => {
  return axios.get(`${URL}sellers/getAllProducts`, {
    headers: {
      Authorization: getJWTToken(),
    },
  });
};

export const searchProductAPI = (payload) => {
  return axios.get(`${URL}sellers/getProducts`, {
    params: payload,
  });
};

export const searchProductByIdAPI = (payload) => {
  return axios.get(`${URL}sellers/getProductById`, {
    params: payload,
  });
};

export const searchCategoryProductAPI = (payload) => {
  return axios.get(`${URL}sellers/searchCategoryProduct`, {
    params: payload,
  });
};

export const getDailyDealsProductAPI = (payload) => {
  return axios.get(`${URL}users/getDailyDealsProduct`);
};

export const getLatestProductAPI = (payload) => {
  return axios.get(`${URL}users/getLatestProduct`);
};

export const getBestSellerProductAPI = (payload) => {
  return axios.get(`${URL}users/getBestSellerProduct`);
};

export const getFeatureProductAPI = (payload) => {
  return axios.get(`${URL}users/getFeatureProduct`);
};
