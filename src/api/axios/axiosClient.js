// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers = {
    Authorization: `Bearer ${Cookies.get('access_token')}`,
    'Refresh-Token': `${Cookies.get('refresh_token')}`,
  };
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    // Handle token here (if yes)...
    if (response.headers['access_token'] && response.headers['refresh_token']) {
      Cookies.set('access_token', response.headers['access_token']);
      Cookies.set('refresh_token', response.headers['refresh_token']);
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);
export default axiosClient;
