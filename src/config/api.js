import axios from 'axios';

// create base url
export const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL || 'https://literature-api-nadrian.herokuapp.com/api/v1' || 'http://localhost:9000/api/v1',
});

// set auth token header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};
