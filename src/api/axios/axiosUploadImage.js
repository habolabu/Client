// api/axiosUploadImage.js
import axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

const axiosUploadImage = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    accept: 'multipart/form-data',
    Authorization: `Bearer ${Cookies.get('habolabu')}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosUploadImage.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosUploadImage.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);
export default axiosUploadImage;
