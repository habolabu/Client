// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

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
    return axiosClient.put(url, {}, { headers: { 'Content-Type': 'application/json' } });
  },
  initBill: () => {
    const url = `/payment/command/api/test`;
    return axiosClient.get(url);
  },
  rejectBill: (billId) => {
    const url = `/payment/command/api/bill/reject/${billId}`;
    return axiosClient.put(url, {}, { headers: { 'Content-Type': 'application/json' } });
  },
  payBill: (data) => {
    const url = '/payment/command/api/bill/pay';
    return axiosClient.post(url, data);
  },
  getBillPayComplete: (billId, params) => {
    const url = `/payment/command/api/bill/pay/complete/${billId}`;
    return axiosClient.get(url, { params });
  },
};

export default billServices;
