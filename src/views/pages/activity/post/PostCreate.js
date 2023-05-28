// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CRow } from '@coreui/react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Helmet from 'src/components/helmet/helmet';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import postServices from 'src/api/activityServices/postServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PostCreate = () => {
  const [editorContentData, setEditorContentData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Configure CKEditor to remove the image toolbar button
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
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Vui lòng nhập tiêu đề bài viết !').min(1, 'Tối thiểu 1 ký tự !'),
    }),
    onSubmit: async (values) => {
      if (editorContentData.length !== 0 && values.title.trim().length !== 0) {
        try {
          const params = {
            title: values.title,
            content: editorContentData,
          };
          const res = await postServices.addPost(params);
          if (res && res.data) {
            toast.success('Tạo thành công !', { theme: 'colored' });
            setEditorContentData('');
            window.location.replace('/habolabu/bai-viet');
          } else {
            toast.error('Tạo thất bại !', {
              theme: 'colored',
            });
          }
        } catch (error) {
          console.log('Thất bại khi gửi dữ liệu: ', error);
          toast.error('Tạo thất bại ! ', {
            theme: 'colored',
          });
        }
      } else {
        toast.error('Vui lòng nhập nội dung bài viết và không để trống tiêu đề! ', {
          theme: 'colored',
        });
      }
    },
  });

  return (
    <Helmet title="Tạo bài viết" role="Admin">
      <CRow>
        <CCol xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex align-items-center justify-content-between">
                <strong>📰 Tạo bài viết</strong>
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
                      {...formik.getFieldProps('title')}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <p className="formik-text-size text-danger mt-1"> {formik.errors.title} </p>
                    ) : null}
                  </CCol>
                </CRow>
                <CRow className="my-3">
                  <CCol sm={12}>
                    <CFormLabel>
                      <b>Nội dung bài viết</b>
                    </CFormLabel>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorContentData}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorContentData(data);
                      }}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={2}>
                    <Button variant="contained" startIcon={<AddIcon />} size="small" type="submit">
                      Tạo bài viết
                    </Button>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </form>
        </CCol>
      </CRow>
    </Helmet>
  );
};

export default PostCreate;
