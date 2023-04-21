// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React from 'react';

const CommentItem = ({ data }) => {
  return (
    <div className="comment-container">
      <div className="comment-item">
        <div className="comment-wrapper">
          <div className="comment-wrapper__img">
            <img
              src="https://res.cloudinary.com/dzd9sonxs/image/upload/v1664544714/avatar/default-avatar_xh2rub.png"
              alt="user img"
            />
          </div>
          <div className="comment-wrapper__info">
            <div className="comment-wrapper__info-header">
              <p>
                <b>{data.fullName}</b>
                <span>{new Date(data.createdAt).toLocaleString('vi-VI')}</span>
              </p>
            </div>
            <div className="comment-wrapper__info-content">{data.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
