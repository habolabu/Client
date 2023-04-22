// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const feedBackServices = {
  getFeedBackAll: (params) => {
    const url = '/activity/query/api/feedback';
    return axiosClient.get(url, { params });
  },
  getFeedBackDetails: (slug) => {
    const url = `/activity/query/api/feedback/${slug}`;
    return axiosClient.get(url);
  },
  addFeedBack: (params) => {
    const url = '/activity/command/api/feedback';
    return axiosClient.post(url, params);
  },
  updateFeedBack: (params) => {
    const url = '/activity/command/api/feedback';
    return axiosClient.put(url, params);
  },
  deleteFeedBack: (slug) => {
    const url = '/activity/command/api/feedback';
    return axiosClient.delete(url, { data: slug });
  },
};

export default feedBackServices;
