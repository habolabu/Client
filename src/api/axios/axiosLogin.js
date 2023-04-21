// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

// api/axiosLogin.js
import axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

const axiosLogin = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosLogin.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosLogin.interceptors.response.use(
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
export default axiosLogin;
