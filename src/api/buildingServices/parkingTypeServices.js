// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const parkingTypeServices = {
  getAllParkingType: (params) => {
    const url = '/building/query/api/parking-type/all';
    return axiosClient.get(url, { params });
  },
  getParkingType: (params) => {
    const url = '/building/query/api/parking-type';
    return axiosClient.get(url, { params });
  },
  getParkingTypeDetails: (slug) => {
    const url = `/building/query/api/parking-type/${slug}`;
    return axiosClient.get(url);
  },
  addParkingType: (params) => {
    const url = '/building/command/api/parking-type';
    return axiosClient.post(url, params);
  },
  updateParkingType: (params) => {
    const url = '/building/command/api/parking-type';
    return axiosClient.put(url, params);
  },
  deleteParkingType: (slug) => {
    const url = '/building/command/api/parking-type';
    return axiosClient.delete(url, { data: slug });
  },
};

export default parkingTypeServices;
