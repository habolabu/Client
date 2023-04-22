// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';
import axiosUploadImage from '../axios/axiosUploadImage';

const emotionServices = {
  getEmotionAll: (params) => {
    const url = '/activity/query/api/emotion';
    return axiosClient.get(url, { params });
  },
  getEmotionDetails: (emotionId) => {
    const url = `/activity/query/api/emotion/${emotionId}`;
    return axiosClient.get(url);
  },
  addEmotion: (data) => {
    const url = '/activity/command/api/emotion';
    return axiosUploadImage.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateEmotion: (params) => {
    const url = '/activity/command/api/emotion';
    return axiosUploadImage.put(url, params, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteEmotion: (emotionId) => {
    const url = '/activity/command/api/emotion';
    return axiosClient.delete(url, { data: emotionId });
  },
};

export default emotionServices;
