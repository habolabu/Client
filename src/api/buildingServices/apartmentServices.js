// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const apartmentServices = {
  getApartments: (params) => {
    const url = '/building/query/api/apartment';
    return axiosClient.get(url, { params });
  },
  getApartmentDetails: (slug) => {
    const url = `/building/query/api/apartment/${slug}`;
    return axiosClient.get(url);
  },
  addApartment: (params) => {
    const url = '/building/command/api/apartment';
    return axiosClient.post(url, params);
  },
  updateApartment: (params) => {
    const url = '/building/command/api/apartment';
    return axiosClient.put(url, params);
  },
  deleteApartment: (params) => {
    const url = '/building/command/api/apartment';
    return axiosClient.delete(url, { data: params });
  },
};

export default apartmentServices;
