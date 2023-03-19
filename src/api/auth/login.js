import axiosLogin from '../axios/axiosLogin';

const authServices = {
  postLogin: (params) => {
    const url = '/auth/query/api/sign-in';
    return axiosLogin.post(url, params);
  },
};

export default authServices;
