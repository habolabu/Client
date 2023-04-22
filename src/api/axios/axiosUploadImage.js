// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

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
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosUploadImage.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers = {
    Authorization: `Bearer ${Cookies.get('access_token')}`,
    'Refresh-Token': `${Cookies.get('refresh_token')}`,
  };
  return config;
});
axiosUploadImage.interceptors.response.use(
  (response) => {
    // Handle token here (if yes)...
    if (response.data.response.body['access_token'] && response.data.response.body['refresh_token']) {
      Cookies.set('access_token', response.data.response.body['access_token']);
      Cookies.set('refresh_token', response.data.response.body['refresh_token']);
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);
export default axiosUploadImage;
