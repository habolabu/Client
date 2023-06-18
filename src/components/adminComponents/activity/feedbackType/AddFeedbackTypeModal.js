// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
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

const AddFeedbackTypeModal = ({ submitAddFeedBackTypeChange }) => {
  const [visibleAddFeedBackType, setVisibleAddFeedBackType] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên loại phản hồi !').min(6, 'Tối thiểu 6 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          name: values.name,
        };
        const res = await feedBackTypeServices.addFeedBackType(params);
        if (res && res.data) {
          toast.success('Thêm thành công ! ', { theme: 'colored' });
          setVisibleAddFeedBackType(false);
          submitAddFeedBackTypeChange();
          formik.values.name = '';
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
        onClick={() => setVisibleAddFeedBackType(!visibleAddFeedBackType)}
      >
        Thêm
      </Button>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleAddFeedBackType}
        onClose={() => setVisibleAddFeedBackType(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm loại phản hồi</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên loại phản hồi <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên loại phản hồi..."
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.name} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddFeedBackType(false)}>
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

export default AddFeedbackTypeModal;
