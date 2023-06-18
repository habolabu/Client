// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { CButton, CForm, CFormInput } from '@coreui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import commentServices from 'src/api/activityServices/commentServices';
import CIcon from '@coreui/icons-react';
import { cilCommentBubble } from '@coreui/icons';

const CommentButton = ({ postId, commentId, submitCommentBtnChange }) => {
  const [showComment, setShowComment] = useState(false);

  const formik = useFormik({
    initialValues: {
      content: '',
      postId: '',
      commentId: 1,
    },
    validationSchema: Yup.object({
      content: Yup.string().required('Vui lòng nhập bình luận !').min(1, 'Tối thiểu 1 ký tự !'),
    }),
    onSubmit: async (values) => {
      if (values.content.trim().length) {
        try {
          const params = {
            content: values.content,
            postId: postId,
            commentId: commentId,
          };
          const res = await commentServices.addComment(params);

          if (res && res.data) {
            formik.values.content = '';
            submitCommentBtnChange();
          } else {
            console.log('Thêm thất bại');
          }
        } catch (error) {
          console.log('Thêm thất bại: ', error);
        }
      } else {
        values.content = '';
      }
    },
  });

  const handleShowComment = () => {
    console.log(showComment);
    setShowComment(!showComment);
  };

  return (
    <div className="comment-container" style={{ cursor: 'pointer' }}>
      <div className="" onClick={handleShowComment}>
        <ChatBubbleOutlineIcon />
        Bình luận
      </div>
      <div className={showComment ? 'd-block comment-action_cmt' : 'd-none'}>
        <CForm onSubmit={formik.handleSubmit} style={{ position: 'relative' }}>
          <CFormInput
            type="text"
            id="content"
            name="content"
            placeholder="Nhập bình luận..."
            {...formik.getFieldProps('content')}
          />
          {formik.touched.content && formik.errors.content ? (
            <p className="formik-text-size text-danger mt-1"> {formik.errors.content} </p>
          ) : null}
          <CButton type="submit" color="info" className="form-cmt-submit">
            <CIcon icon={cilCommentBubble} />
          </CButton>
        </CForm>
      </div>
    </div>
  );
};

export default CommentButton;
