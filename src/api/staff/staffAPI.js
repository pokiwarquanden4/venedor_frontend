import axios from 'axios';
import { getJWTToken } from '../authen/Authen';
import { createHeaders } from '..';
const URL = process.env.REACT_APP_URL;

export const createStaffAPI = (payload) => {
    return axios.post(`${URL}sellers/createStaff`, payload, {
        headers: createHeaders({ Authorization: getJWTToken() }),
    });
};

export const editStaffAPI = (payload) => {
    return axios.post(`${URL}sellers/editStaff`, payload, {
        headers: createHeaders({ Authorization: getJWTToken() }),
    });
};

export const deleteStaffAPI = (payload) => {
    return axios.post(`${URL}sellers/deleteStaff`, payload, {
        headers: createHeaders({ Authorization: getJWTToken() }),
    });
};

export const getAllStaffAPI = (payload) => {
    return axios.get(`${URL}sellers/getAllStaff`, {
        headers: createHeaders({ Authorization: getJWTToken() }),
    });
};