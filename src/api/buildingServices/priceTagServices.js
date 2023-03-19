import axiosClient from '../axios/axiosClient';

const priceTagServices = {
  getAllPriceTag: (params) => {
    const url = '/building/query/api/price-tag/all';
    return axiosClient.get(url, { params });
  },
  getPriceTag: (params) => {
    const url = '/building/query/api/price-tag';
    return axiosClient.get(url, { params });
  },
  getPriceTagDetails: (slug) => {
    const url = `/building/query/api/price-tag/${slug}`;
    return axiosClient.get(url);
  },
  addPriceTag: (params) => {
    const url = '/building/command/api/price-tag';
    return axiosClient.post(url, params);
  },
  updatePriceTag: (params) => {
    const url = '/building/command/api/price-tag';
    return axiosClient.put(url, params);
  },
  deletePriceTag: (slug) => {
    const url = '/building/command/api/price-tag';
    return axiosClient.delete(url, { data: slug });
  },
};

export default priceTagServices;
