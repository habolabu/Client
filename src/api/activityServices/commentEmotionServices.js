// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const commentEmotionServices = {
  getCommentEmotionAll: (commentId) => {
    const url = `/activity/query/api/comment-emotion?commentId=${commentId}`;
    return axiosClient.get(url);
  },
  addCommentEmotion: (params) => {
    const url = '/activity/command/api/comment-emotion';
    return axiosClient.post(url, params);
  },
  deleteCommentEmotion: (commentId) => {
    const url = '/activity/command/api/comment-emotion';
    return axiosClient.delete(url, { data: commentId });
  },
};

export default commentEmotionServices;
