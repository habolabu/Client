// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosLogin from '../axios/axiosLogin';

const authServices = {
  postLogin: (params) => {
    const url = '/auth/query/api/sign-in';
    return axiosLogin.post(url, params);
  },
};

export default authServices;
