import axiosClient from '../axios/axiosClient';

const roleServices = {
  getAllRole: (params) => {
    const url = '/auth/query/api/role/all';
    return axiosClient.get(url, { params });
  },
};

export default roleServices;
