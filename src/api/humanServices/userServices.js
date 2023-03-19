import axiosClient from '../axios/axiosClient';

const userServices = {
  getUsers: (params) => {
    const url = '/human/query/api/user';
    return axiosClient.get(url, { params });
  },
  getUserCurrentDetails: () => {
    const url = `/human/query/api/user/detail`;
    return axiosClient.get(url);
  },
  getUserDetails: (userId) => {
    const url = `/human/query/api/user/${userId}`;
    return axiosClient.get(url);
  },
  addUser: (params) => {
    const url = '/human/command/api/user';
    return axiosClient.post(url, params);
  },
  updateUser: (params) => {
    const url = '/human/command/api/user';
    return axiosClient.put(url, params);
  },
  deleteUser: (userId) => {
    const url = '/human/command/api/user';
    return axiosClient.delete(url, { data: userId });
  },
};

export default userServices;
