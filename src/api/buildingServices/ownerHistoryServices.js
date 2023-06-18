// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const ownerHistoryServices = {
  assignUserToRoom: (params) => {
    const url = '/building/command/api/owner-history';
    return axiosClient.post(url, { params });
  },
  unAssignUserToRoom: (idRecord) => {
    const url = '/building/command/api/owner-history';
    return axiosClient.delete(url, { data: idRecord });
  },
};

export default ownerHistoryServices;
