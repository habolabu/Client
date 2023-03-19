import axiosClient from '../axios/axiosClient';

const parkingSpaceServices = {
  getParkingSpace: (params) => {
    const url = '/building/query/api/parking-space';
    return axiosClient.get(url, { params });
  },
  addParkingSpace: (params) => {
    const url = '/building/command/api/parking-space';
    return axiosClient.post(url, params);
  },
  updateParkingSpace: (params) => {
    const url = '/building/command/api/parking-space';
    return axiosClient.put(url, params);
  },
  deleteParkingSpace: (slug) => {
    const url = '/building/command/api/parking-space';
    return axiosClient.delete(url, { data: slug });
  },
};

export default parkingSpaceServices;
