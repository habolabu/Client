// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React from 'react';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { permissionLocal } from 'src/utils/permissionLocal';
import PermissionDirection from 'src/utils/PermissionDirection';
import FBReactions from '../emotion/FBReaction';

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
              <p className="m-0">
                <b>{data.fullName}</b>
                <span>{new Date(data.createdAt).toLocaleString('vi-VI')}</span>
              </p>
            </div>
            <div className="comment-wrapper__info-content mb-2">{data.content}</div>
            <div className="comment-action d-flex">
              <FBReactions />
              {/* {permissionLocal.isExistPermission(PermissionDirection.DELETE_EXIST_COMMENT) ? (
                <div className="comment-action__delete me-4">
                  <DeleteOutlineIcon />
                  Xoá
                </div>
              ) : null} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
