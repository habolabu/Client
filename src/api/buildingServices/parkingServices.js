// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const parkingServices = {
  getParking: (params) => {
    const url = '/building/query/api/parking';
    return axiosClient.get(url, { params });
  },
  getParkingDetails: (slug) => {
    const url = `/building/query/api/parking/${slug}`;
    return axiosClient.get(url);
  },
  addParking: (params) => {
    const url = '/building/command/api/parking';
    return axiosClient.post(url, params);
  },
  updateParking: (params) => {
    const url = '/building/command/api/parking';
    return axiosClient.put(url, params);
  },
  deleteParking: (slug) => {
    const url = '/building/command/api/parking';
    return axiosClient.delete(url, { data: slug });
  },
};

export default parkingServices;
