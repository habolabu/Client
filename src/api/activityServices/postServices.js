// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const postServices = {
  getPostAll: (params) => {
    const url = '/activity/query/api/post';
    return axiosClient.get(url, { params });
  },
  getPostDetails: (slug) => {
    const url = `/activity/query/api/post/${slug}`;
    return axiosClient.get(url);
  },
  addPost: (params) => {
    const url = '/activity/command/api/post';
    return axiosClient.post(url, params);
  },
  updatePost: (params) => {
    const url = '/activity/command/api/post';
    return axiosClient.put(url, params);
  },
  deletePost: (slug) => {
    const url = '/activity/command/api/post';
    return axiosClient.delete(url, { data: slug });
  },
};

export default postServices;
