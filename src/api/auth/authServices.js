// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const authServices = {
  changePassword: (params) => {
    const url = '/auth/command/api/role';
    return axiosClient.post(url, params);
  },
  grantPermission: (data) => {
    const url = '/auth/command/api/account-setting';
    return axiosClient.put(url, data);
  },
  addRole: (params) => {
    const url = '/auth/command/api/role';
    return axiosClient.post(url, params);
  },
  deleteRole: (roleId) => {
    const url = '/auth/command/api/role';
    return axiosClient.delete(url, { data: roleId });
  },
  updateRole: (data) => {
    const url = '/auth/command/api/role';
    return axiosClient.put(url, data);
  },
  getAllRole: (params) => {
    const url = '/auth/query/api/role/all';
    return axiosClient.get(url, { params });
  },
  getPermissionAccount: (accountId) => {
    const url = `/auth/query/api/permission/${accountId}`;
    return axiosClient.get(url);
  },
  getAllPermission: (params) => {
    const url = `/auth/query/api/permission/all`;
    return axiosClient.get(url, { params });
  },
  getAllPermissionCurrentUser: (params) => {
    const url = `/auth/query/api/permission`;
    return axiosClient.get(url, { params });
  },
};

export default authServices;
