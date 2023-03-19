import axiosClient from '../axios/axiosClient';

const areaServices = {
  getArea: (params) => {
    const url = '/building/query/api/area';
    return axiosClient.get(url, { params });
  },
  getAreaDetails: (slug) => {
    const url = `/building/query/api/area/${slug}`;
    return axiosClient.get(url);
  },
  addArea: (params) => {
    const url = '/building/command/api/area';
    return axiosClient.post(url, params);
  },
  updateArea: (params) => {
    const url = '/building/command/api/area';
    return axiosClient.put(url, params);
  },
  deleteArea: (params) => {
    const url = '/building/command/api/area';
    return axiosClient.delete(url, { data: params });
  },
};

export default areaServices;
