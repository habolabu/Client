// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  CButton,
  CCol,
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
import AddIcon from '@mui/icons-material/Add';
import feedBackTypeServices from 'src/api/activityServices/feedBackTypeServices';
import feedBackServices from 'src/api/activityServices/feedBackServices';
import userServices from 'src/api/humanServices/userServices';

const AddFeedbackModal = ({ submitAddFeedBackChange }) => {
  const [visibleAddFeedBack, setVisibleAddFeedBack] = useState(false);
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
          userId: currentUser.id,
          title: values.title,
          content: values.content,
          feedBackTypeId: feedBackTypeId,
        };
        console.log(params);
        const res = await feedBackServices.addFeedBack(params);
        if (res && res.data) {
          toast.success('Thêm thành công ! ', { theme: 'colored' });
          setVisibleAddFeedBack(false);
          submitAddFeedBackChange();
          formik.values.title = '';
          formik.values.content = '';
        }
      } catch (error) {
        console.log('Thêm thất bại: ', error);
        toast.error('Thêm thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        size="small"
        className="me-2"
        onClick={() => setVisibleAddFeedBack(!visibleAddFeedBack)}
      >
        Thêm
      </Button>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleAddFeedBack}
        onClose={() => setVisibleAddFeedBack(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm phản hồi</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
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
            <CButton color="secondary" onClick={() => setVisibleAddFeedBack(false)}>
              Huỷ
            </CButton>
            <CButton type="submit" color="info">
              Xác nhận
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
};

export default AddFeedbackModal;
