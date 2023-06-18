/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React, { useState } from 'react';
import FBReactions from '../emotion/FBReaction';
import CommentButton from './commentButton';
import commentServices from 'src/api/activityServices/commentServices';
import { useEffect } from 'react';

const CommentItem = ({ data, commentId, postId }) => {
  const [comments, setComments] = useState(null);

  const getCommentsNested = async () => {
    try {
      const params = {
        postId: postId,
        page: 1,
        commentId: commentId,
      };
      const res = await commentServices.getCommentAll(params);
      if (res && res.data) {
        setComments(res.data.response.body);
      } else {
        console.log('Thất bại khi lấy bình luận: ', res.response.message);
      }
    } catch (error) {
      console.log('Thất bại khi lấy bình luận: ', error);
    }
  };

  useEffect(() => {
    getCommentsNested();
  }, []);

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
              <CommentButton postId={postId} commentId={commentId} submitCommentBtnChange={getCommentsNested} />
            </div>
          </div>
        </div>
        {comments != null ? (
          <>
            {comments.totalPage > 0 ? (
              <>
                {comments.data.map((comment) => {
                  return (
                    <div className="comment-wrapper-nested" key={comment.id}>
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
                              <b>{comment.fullName}</b>
                              <span>{new Date(comment.createdAt).toLocaleString('vi-VI')}</span>
                            </p>
                          </div>
                          <div className="comment-wrapper__info-content mb-2">{comment.content}</div>
                          <div className="comment-action d-flex">
                            <FBReactions />
                            <CommentButton />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CommentItem;
