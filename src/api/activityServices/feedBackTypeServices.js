// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const feedBackTypeServices = {
  getFeedBackTypeAll: (params) => {
    const url = '/activity/query/api/feedback-type';
    return axiosClient.get(url, { params });
  },
  getFeedBackTypeDetails: (slug) => {
    const url = `/activity/query/api/feedback-type/${slug}`;
    return axiosClient.get(url);
  },
  addFeedBackType: (params) => {
    const url = '/activity/command/api/feedback-type';
    return axiosClient.post(url, params);
  },
  updateFeedBackType: (params) => {
    const url = '/activity/command/api/feedback-type';
    return axiosClient.put(url, params);
  },
  deleteFeedBackType: (slug) => {
    const url = '/activity/command/api/feedback-type';
    return axiosClient.delete(url, { data: slug });
  },
};

export default feedBackTypeServices;
