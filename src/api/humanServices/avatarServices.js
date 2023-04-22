// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';
import axiosUploadImage from '../axios/axiosUploadImage';

const avatarServices = {
  getAvatarUserID: (params, userId) => {
    const url = `/human/query/api/avatar/user/${userId}`;
    return axiosClient.get(url, { params });
  },
  getAvatarCurrentUser: (params) => {
    const url = `/human/query/api/avatar`;
    return axiosClient.get(url, { params });
  },
  getAvatarDetails: (avatarId) => {
    const url = `/human/query/api/avatar/${avatarId}`;
    return axiosClient.get(url);
  },
  addAvatar: (data) => {
    const url = '/human/command/api/avatar';
    return axiosUploadImage.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateAvatar: (data) => {
    const url = '/human/command/api/avatar';
    return axiosClient.put(url, data);
  },
  deleteAvatar: (avatarId) => {
    const url = '/human/command/api/avatar';
    return axiosClient.delete(url, { data: avatarId });
  },
};

export default avatarServices;
