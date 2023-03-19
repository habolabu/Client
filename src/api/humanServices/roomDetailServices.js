import axiosClient from '../axios/axiosClient';

const roomDetailServices = {
  getRoom: (params) => {
    const url = '/human/query/api/room-detail';
    return axiosClient.get(url, { params });
  },
  addRoom: (params) => {
    const url = '/human/command/api/room-detail';
    return axiosClient.post(url, params);
  },
  updateRoom: (params) => {
    const url = '/human/command/api/room-detail';
    return axiosClient.put(url, params);
  },
  deleteRoom: (slug) => {
    const url = '/human/command/api/room-detail';
    return axiosClient.delete(url, { data: slug });
  },
};

export default roomDetailServices;
