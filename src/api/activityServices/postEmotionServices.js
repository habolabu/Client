// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import axiosClient from '../axios/axiosClient';

const postEmotionServices = {
  getPostEmotionAll: () => {
    const url = '/activity/query/api/post-emotion';
    return axiosClient.get(url);
  },
  addPostEmotion: (params) => {
    const url = '/activity/command/api/post-emotion';
    return axiosClient.post(url, params);
  },
  deletePostEmotion: (postId) => {
    const url = '/activity/command/api/post-emotion';
    return axiosClient.delete(url, { data: postId });
  },
};

export default postEmotionServices;
