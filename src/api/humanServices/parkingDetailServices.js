import axiosClient from '../axios/axiosClient';

const parkingDetailServices = {
  getParking: (params) => {
    const url = '/human/query/api/parking-detail';
    return axiosClient.get(url, { params });
  },
  addParking: (params) => {
    const url = '/human/command/api/parking-detail';
    return axiosClient.post(url, params);
  },
  updateParking: (params) => {
    const url = '/human/command/api/parking-detail';
    return axiosClient.put(url, params);
  },
  deleteParking: (slug) => {
    const url = '/human/command/api/parking-detail';
    return axiosClient.delete(url, { data: slug });
  },
};

export default parkingDetailServices;
