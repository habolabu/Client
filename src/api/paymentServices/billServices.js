import axiosClient from '../axios/axiosClient';

const billServices = {
  getBillCurrentUser: (params) => {
    const url = '/payment/query/api/bill';
    return axiosClient.get(url, { params });
  },
  getAllBill: (params) => {
    const url = `/payment/query/api/bill/all`;
    return axiosClient.get(url, { params });
  },
  getBillDetails: (billId) => {
    const url = `/payment/query/api/bill/${billId}`;
    return axiosClient.get(url);
  },
  statistics: (params) => {
    const url = '/payment/query/api/bill/statistic';
    return axiosClient.get(url, { params });
  },
  getAllPaymentTypes: (params) => {
    const url = '/payment/query/api/payment-type/all';
    return axiosClient.get(url, params);
  },
  getAllStatusBill: (userId) => {
    const url = '/payment/query/api/bill-status/all';
    return axiosClient.get(url, { data: userId });
  },
  approveBill: (billId) => {
    const url = `/payment/command/api/bill/approve/${billId}`;
    return axiosClient.put(url);
  },
  initBill: () => {
    const url = `/payment/command/api/bill/test`;
    return axiosClient.get(url);
  },
  rejectBill: (billId) => {
    const url = `/payment/command/api/bill/reject/${billId}`;
    return axiosClient.put(url);
  },
  payBill: (data) => {
    const url = '/payment/command/api/bill/pay';
    return axiosClient.post(url, data);
  },
  getBillPayComplete: (billId) => {
    const url = `/payment/command/api/bill/pay/complete/${billId}`;
    return axiosClient.get(url);
  },
};

export default billServices;
