// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const roleServices = {
  getAllRole: (params) => {
    const url = '/auth/query/api/role/all';
    return axiosClient.get(url, { params });
  },
};

export default roleServices;
