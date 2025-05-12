import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
import { createHeaders } from '..';
const URL = process.env.REACT_APP_URL;

// SELLER APIs
export const addProductAPI = (payload) => {
  return axios.post(`${URL}sellers/createProduct`, payload, {
    headers: createHeaders({ Authorization: getJWTToken() }),
  });
};

export const editProductAPI = (payload) => {
  return axios.post(`${URL}sellers/editProduct`, payload, {
    headers: createHeaders({ Authorization: getJWTToken() }),
  });
};

export const getSellerProductAPI = (payload) => {
  return axios.get(`${URL}sellers/getSellerProducts`, {
    params: payload,
    headers: createHeaders({ Authorization: getJWTToken() }),
  });
};

export const searchProductAPI = (payload) => {
  return axios.get(`${URL}sellers/getProducts`, {
    params: payload,
    headers: createHeaders(),
  });
};

export const searchProductByIdAPI = (payload) => {
  return axios.get(`${URL}sellers/getProductById`, {
    params: payload,
    headers: createHeaders(),
  });
};

export const searchCategoryProductAPI = (payload) => {
  return axios.get(`${URL}sellers/searchCategoryProduct`, {
    params: payload,
    headers: createHeaders(),
  });
};

// USER APIs
export const getDailyDealsProductAPI = (payload) => {
  return axios.get(`${URL}users/getDailyDealsProduct`, {
    headers: createHeaders(),
  });
};

export const getLatestProductAPI = (payload) => {
  return axios.get(`${URL}users/getLatestProduct`, {
    headers: createHeaders(),
  });
};

export const getBestSellerProductAPI = (payload) => {
  return axios.get(`${URL}users/getBestSellerProduct`, {
    headers: createHeaders(),
  });
};

export const getFeatureProductAPI = (payload) => {
  return axios.get(`${URL}users/getFeatureProduct`, {
    headers: createHeaders(),
  });
};

export const getCommentAPI = (payload) => {
  return axios.get(`${URL}users/getComment`, {
    params: payload,
    headers: createHeaders(),
  });
};

export const createCommentAPI = (payload) => {
  return axios.post(`${URL}users/addComment`, payload, {
    headers: createHeaders({ Authorization: getJWTToken() }),
  });
};

export const getCategoryAPI = (payload) => {
  return axios.get(`${URL}users/getCategory`, {
    headers: createHeaders(),
  });
};

export const getShopRankingSalesAPI = (payload) => {
  return axios.get(`${URL}sellers/getShopRankingSales`, {
    params: payload,
    headers: createHeaders({ Authorization: getJWTToken() }),
  });
};

export const getShopRankingRatingAPI = (payload) => {
  return axios.get(`${URL}sellers/getShopRankingRating`, {
    params: payload,
    headers: createHeaders({ Authorization: getJWTToken() }),
  });
};
export const getRankingDataAPI = (payload) => {
  return axios.get(`${URL}sellers/getRankingData`, {
    params: payload,
    headers: createHeaders({ Authorization: getJWTToken() }),
  });
};

export const getShopRankingProductSalesAPI = (payload) => {
  return axios.get(`${URL}sellers/getShopRankingProductSales`, {
    params: payload,
    headers: createHeaders({ Authorization: getJWTToken() }),
  });
};

export const getSalesToBuyAPI = (payload) => {
  return axios.get(`${URL}sellers/getSaleToBuyData`, {
    params: payload,
    headers: createHeaders({ Authorization: getJWTToken() }),
  });
};


