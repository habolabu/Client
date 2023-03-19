import axiosClient from '../axios/axiosClient';

const authServices = {
  changePassword: (params) => {
    const url = '/auth/command/api/password';
    return axiosClient.post(url, params);
  },
};

export default authServices;
