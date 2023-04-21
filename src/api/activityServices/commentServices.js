// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const commentServices = {
  getCommentAll: (params) => {
    const url = '/activity/query/api/comment';
    return axiosClient.get(url, { params });
  },
  addComment: (params) => {
    const url = '/activity/command/api/comment';
    return axiosClient.post(url, params);
  },
  updateComment: (params) => {
    const url = '/activity/command/api/comment';
    return axiosClient.put(url, params);
  },
  deleteComment: (commentId) => {
    const url = '/activity/command/api/comment';
    return axiosClient.delete(url, { data: commentId });
  },
};

export default commentServices;
