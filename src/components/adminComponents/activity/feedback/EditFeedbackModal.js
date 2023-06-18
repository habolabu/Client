// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react';

import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import feedBackTypeServices from 'src/api/activityServices/feedBackTypeServices';
import feedBackServices from 'src/api/activityServices/feedBackServices';
import userServices from 'src/api/humanServices/userServices';

const EditFeedbackModal = ({ feedbackId, slug, submitEditFeedBackChange }) => {
  const [visibleEditFeedBackType, setVisibleEditFeedBackType] = useState(false);
  const [feedBackTypeList, setFeedBackTypeList] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [feedBackTypeId, setFeedBackTypeId] = useState(1);

  const getFeedBackTypeAll = async () => {
    try {
      const res = await feedBackTypeServices.getFeedBackTypeAll();
      if (res && res.data) {
        setFeedBackTypeList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách loại phản hồi ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách loại phản hồi: ', error);
      toast.error('Thất bại khi lấy danh sách loại phản hồi ! ', { theme: 'colored' });
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await userServices.getUserCurrentDetails();
      if (res && res.data) {
        setCurrentUser(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy thông tin người dùng ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy thông tin người dùng: ', error);
      toast.error('Thất bại khi lấy thông tin người dùng ! ', { theme: 'colored' });
    }
  };

  useEffect(() => {
    getFeedBackTypeAll();
    getCurrentUser();
  }, []);

  useEffect(() => {
    const getFeedBackDetails = async () => {
      try {
        const res = await feedBackServices.getFeedBackDetails(slug);
        if (res && res.data) {
          formik.values.title = res.data.response.body.title;
          formik.values.content = res.data.response.body.content;
        } else {
          toast.error('Thất bại khi lấy thông tin chi tiết phản hồi! ', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thất bại khi lấy thông tin chi tiết phản hồi: ', error);
        toast.error('Thất bại khi lấy thông tin chi tiết phản hồi! ', { theme: 'colored' });
      }
    };

    getFeedBackDetails();
  }, [slug]);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Vui lòng nhập tiêu đề !').min(6, 'Tối thiểu 6 ký tự !'),
      content: Yup.string().required('Vui lòng nhập nội dung !').min(6, 'Tối thiểu 6 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          id: feedbackId,
          title: values.title,
          content: values.content,
          userId: currentUser.id,
          feedBackTypeId: feedBackTypeId,
        };
        const res = await feedBackServices.updateFeedBack(params);
        if (res && res.data) {
          toast.success('Cập nhật thành công ! ', { theme: 'colored' });
          setVisibleEditFeedBackType(false);
          submitEditFeedBackChange();
        }
      } catch (error) {
        console.log('Cập nhật thất bại: ', error);
        toast.error('Cập nhật thất bại ! ', { theme: 'colored' });
      }
    },
  });
  return (
    <>
      <Button
        variant="contained"
        color="info"
        endIcon={<MdEdit />}
        size="small"
        className="me-2 mb-1"
        onClick={() => setVisibleEditFeedBackType(!visibleEditFeedBackType)}
      >
        Sửa
      </Button>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleEditFeedBackType}
        onClose={() => setVisibleEditFeedBackType(false)}
      >
        <CModalHeader>
          <CModalTitle>Sửa thông tin loại phản hồi</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="title" className="col-sm-12 col-form-label">
                  <b>
                    Tên phản hồi <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Nhập tên phản hồi..."
                  {...formik.getFieldProps('title')}
                />
                {formik.touched.title && formik.errors.title ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.title} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="floorNumber" className="col-sm-12 col-form-label">
                  <b>
                    Tên loại phản hồi <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                {feedBackTypeList ? (
                  <CFormSelect
                    aria-label="Default select example"
                    onChange={(e) => {
                      const selectedType = e.target.value;
                      setFeedBackTypeId(selectedType);
                    }}
                  >
                    {feedBackTypeList.data.map((feedBackTypeItem) => {
                      return (
                        <option key={feedBackTypeItem.id} value={feedBackTypeItem.id}>
                          {feedBackTypeItem.name}
                        </option>
                      );
                    })}
                  </CFormSelect>
                ) : (
                  <p>Đang lấy loại phản hồi...</p>
                )}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="content" className="col-sm-12 col-form-label">
                  <b>
                    Nội dung <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormTextarea
                  type="text"
                  id="content"
                  name="content"
                  rows={3}
                  placeholder="Nhập nội dung..."
                  {...formik.getFieldProps('content')}
                />
                {formik.touched.content && formik.errors.content ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.content} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEditFeedBackType(false)}>
              Huỷ
            </CButton>
            <CButton type="submit" color="info">
              Xác nhận
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default EditFeedbackModal;
