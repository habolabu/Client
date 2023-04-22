// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardSubtitle,
  CCardText,
  CBadge,
  CNavLink,
  CCardFooter,
  CRow,
  CCol,
  CFormInput,
  CButton,
  CForm,
} from '@coreui/react';

import { Skeleton } from '@mui/material';

import postServices from 'src/api/activityServices/postServices';
import CIcon from '@coreui/icons-react';
import { cilCommentBubble, cilMoodGood } from '@coreui/icons';
import Helmet from 'src/components/helmet/helmet';
import commentServices from 'src/api/activityServices/commentServices';
import CommentItem from 'src/components/adminComponents/activity/comment/commentItem';
import FBReactions from 'src/components/adminComponents/activity/emotion/FBReaction';

const PostDetail = () => {
  const [postInfo, setPostInfo] = useState(null);
  const [comments, setComments] = useState(null);
  const url = useParams();

  const getPostDetails = async () => {
    try {
      const res = await postServices.getPostDetails(url.postSlug);
      if (res && res.data) {
        getComments(res.data.response.body.id);
        setPostInfo(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách bài viết ! ' + res.response.message, {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách bài viết: ', error);
      toast.error('Thất bại khi lấy danh sách bài viết ! ' + error.message, { theme: 'colored' });
    }
  };

  const getComments = async (postId) => {
    try {
      const params = {
        postId: postId,
      };
      const res = await commentServices.getCommentAll(params);
      if (res && res.data) {
        setComments(res.data.response.body.data);
      } else {
        toast.error('Thất bại khi lấy bình luận ! ' + res.response.message, {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy bình luận: ', error);
      toast.error('Thất bại khi lấy bình luận ! ' + error.message, { theme: 'colored' });
    }
  };

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
      try {
        const params = {
          content: values.content,
          postId: postInfo.id,
          commentId: '',
        };
        const res = await commentServices.addComment(params);

        if (res && res.data) {
          toast.success('Thêm thành công !', { theme: 'colored' });
          formik.values.content = '';
          getPostDetails();
        } else {
          toast.error('Thêm thất bại !', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thêm thất bại: ', error);
        toast.error('Thêm thất bại ! ', {
          theme: 'colored',
        });
      }
    },
  });

  // get data page
  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <Helmet title="Chi tiết bài viết" role="Admin">
      {postInfo != null ? (
        <CCard>
          <CCardHeader>
            <strong>{postInfo.title}</strong>
          </CCardHeader>
          <CCardBody>
            <CCardSubtitle className="mb-4 text-medium-emphasis">
              Ngày tạo: {postInfo.createdAt.slice(0, 10)}
            </CCardSubtitle>
            <CCardText className="my-5" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            <div className="d-flex justify-content-between">
              <p>
                <CIcon icon={cilMoodGood} size="xl" />
                <CBadge color="warning" className="badge-sm position-absolute start-90 translate-middle">
                  {postInfo.totalEmotion}
                </CBadge>
              </p>
              <p className="px-2">{postInfo.totalComment} bình luận</p>
            </div>
            <FBReactions />
            <CForm onSubmit={formik.handleSubmit}>
              <CRow className="align-items-center justify-content-center my-4">
                <CCol sm={12}>
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
                </CCol>
              </CRow>
              <CButton type="submit" color="info">
                Bình luận
              </CButton>
            </CForm>
          </CCardBody>
          <CCardFooter className="px-4 pb-5">
            {comments != null ? (
              comments.map((comment) => {
                return <CommentItem key={comment.id} data={comment}></CommentItem>;
              })
            ) : (
              <p>Không có bình luận nào</p>
            )}
          </CCardFooter>
        </CCard>
      ) : (
        <CRow>
          <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
          <CCol sm={4}>
            <Skeleton variant="rectangular" height={118} />
            <Skeleton />
            <Skeleton width="60%" />
          </CCol>
          <CCol sm={4}>
            <Skeleton variant="rectangular" height={118} />
            <Skeleton />
            <Skeleton width="60%" />
          </CCol>
        </CRow>
      )}
    </Helmet>
  );
};

export default PostDetail;
