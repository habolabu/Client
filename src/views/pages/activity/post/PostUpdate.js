// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from '@mui/material';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormLabel, CFormInput } from '@coreui/react';

import { Skeleton } from '@mui/material';

import postServices from 'src/api/activityServices/postServices';
import Helmet from 'src/components/helmet/helmet';
import { MdEdit } from 'react-icons/md';

const PostUpdate = () => {
  const [postInfo, setPostInfo] = useState(null);
  const url = useParams();

  const getPostDetails = async () => {
    try {
      const res = await postServices.getPostDetails(url.postSlug);
      if (res && res.data) {
        setPostInfo(res.data.response.body);
      } else {
        toast.error('Lấy thông tin bài viết thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Lấy thông tin bài viết thất bại: ', error);
      toast.error('Lấy thông tin bài viết thất bại ! ', { theme: 'colored' });
    }
  };

  // get data page
  useEffect(() => {
    const callApiPost = setTimeout(() => {
      getPostDetails();
    }, 500);

    return () => {
      clearTimeout(callApiPost);
    };
  }, []);

  // Configure CKEditor to remove the image toolbar button
  useEffect(() => {
    ClassicEditor.defaultConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'blockQuote',
          'insertTable',
          'undo',
          'redo',
        ],
      },
      image: {
        toolbar: [
          'imageStyle:inline',
          'imageStyle:block',
          'imageStyle:side',
          '|',
          'toggleImageCaption',
          'imageTextAlternative',
        ],
      },
    };
  }, []);

  const handlePostUpdate = async () => {
    try {
      const params = {
        id: postInfo.id,
        title: postInfo.title,
        content: postInfo.content,
      };
      const res = await postServices.updatePost(params);
      if (res && res.data) {
        toast.success('Chỉnh sửa thành công ! ', {
          theme: 'colored',
        });
      } else {
        toast.error('Chỉnh sửa thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Chỉnh sửa thất bại: ', error);
      toast.error('Chỉnh sửa thất bại ! ', { theme: 'colored' });
    }
  };

  return (
    <Helmet title="Chi tiết bài viết" role="Admin">
      {postInfo != null ? (
        <CCard className="mb-4">
          <CCardHeader className="d-flex align-items-center justify-content-between">
            <strong>📰 Chỉnh sửa bài viết</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <CFormLabel>
                  <b>Tiêu đề bài viết</b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="postTitle"
                  floatingLabel="Tên tiêu đề..."
                  placeholder="Nhập tiêu đề..."
                  defaultValue={postInfo.title}
                  onChange={(e) => setPostInfo({ ...postInfo, title: e.target.value })}
                />
              </CCol>
            </CRow>
            <CRow className="my-3">
              <CCol sm={12}>
                <CFormLabel>
                  <b>Nội dung bài viết</b>
                </CFormLabel>
                <CKEditor
                  editor={ClassicEditor}
                  data={postInfo.content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setPostInfo({ ...postInfo, content: data });
                  }}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={2}>
                <Button
                  variant="contained"
                  startIcon={<MdEdit />}
                  size="small"
                  type="submit"
                  onClick={() => handlePostUpdate()}
                >
                  Chỉnh sửa
                </Button>
              </CCol>
            </CRow>
          </CCardBody>
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

export default PostUpdate;
