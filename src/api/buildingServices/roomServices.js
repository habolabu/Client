import axiosClient from '../axios/axiosClient';

const roomServices = {
  getRoom: (params) => {
    const url = '/building/query/api/room';
    return axiosClient.get(url, { params });
  },
  getRoomDetails: (slug) => {
    const url = `/building/query/api/room/${slug}`;
    return axiosClient.get(url);
  },
  addRoom: (params) => {
    const url = '/building/command/api/room';
    return axiosClient.post(url, params);
  },
  updateRoom: (params) => {
    const url = '/building/command/api/room';
    return axiosClient.put(url, params);
  },
  deleteRoom: (slug) => {
    const url = '/building/command/api/room';
    return axiosClient.delete(url, { data: slug });
  },
};

export default roomServices;
