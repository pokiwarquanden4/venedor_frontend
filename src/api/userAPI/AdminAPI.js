import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
import { createHeaders } from '..';

const URL = process.env.REACT_APP_URL;

export const getUserListAPI = (payload) => {
    return axios.get(`${URL}admin/getUserList`, {
        params: payload,
        headers: createHeaders({
            Authorization: getJWTToken(),
        }),
    });
};

export const getSellerListAPI = (payload) => {
    return axios.get(`${URL}admin/getSellerList`, {
        params: payload,
        headers: createHeaders({
            Authorization: getJWTToken(),
        }),
    });
};

export const disableUserAPI = (payload) => {
    return axios.post(`${URL}admin/disableUser`, payload, {
        headers: createHeaders({
            Authorization: getJWTToken(),
        }),
    });
};

export const createReportAPI = (payload) => {
    return axios.post(`${URL}admin/createReport`, payload, {
        headers: createHeaders({
            Authorization: getJWTToken(),
        }),
    });
};

export const getReportedAPI = (payload) => {
    return axios.get(`${URL}admin/getAllReported`, {
        params: payload,
        headers: createHeaders({
            Authorization: getJWTToken(),
        }),
    });
};

export const getGraphAPI = (payload) => {
    return axios.get(`${URL}admin/getGraph`, {
        params: payload,
        headers: createHeaders({
            Authorization: getJWTToken(),
        }),
    });
};

export const createRefundAPI = (payload) => {
    return axios.post(`${URL}admin/createRefund`, payload, {
        headers: createHeaders({
            Authorization: getJWTToken(),
        }),
    });
};

export const handleReportAPI = (payload) => {
    return axios.post(`${URL}admin/handleReport`, payload, {
        headers: createHeaders({
            Authorization: getJWTToken(),
        }),
    });
};
