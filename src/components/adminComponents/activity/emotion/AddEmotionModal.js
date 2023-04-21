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
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react';

import AddIcon from '@mui/icons-material/Add';

import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import emotionServices from 'src/api/activityServices/emotionServices';

const AddEmotionModal = ({ submitAddEmotionChange }) => {
  const [visibleAddEmotion, setVisibleAddEmotion] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      icon: File,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Vui lòng nhập tên cảm xúc !').min(2, 'Tối thiểu 2 ký tự !'),
      icon: Yup.mixed().required('Vui lòng upload hình !'),
    }),
    onSubmit: async (values) => {
      let loadingLogin = document.getElementById('loadingLogin');
      loadingLogin.classList.add('show');

      try {
        var bodyFormData = new FormData();
        bodyFormData.append('name', values.name);
        bodyFormData.append('icon', values.icon);
        const res = await emotionServices.addEmotion(bodyFormData);

        if (res.status === 200) {
          toast.success('Thêm thành công !', { theme: 'colored' });
          loadingLogin.classList.remove('show');
          setVisibleAddEmotion(false);
          submitAddEmotionChange();
        } else if (res.error.message !== undefined) {
          toast.error('Thêm thất bại !', {
            theme: 'colored',
          });
          loadingLogin.classList.remove('show');
        }
      } catch (error) {
        console.log('Thêm thất bại: ', error);
        loadingLogin.classList.remove('show');
        toast.error('Thêm thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <div className="loading-login" id="loadingLogin">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        size="small"
        className="ms-2"
        onClick={() => setVisibleAddEmotion(!visibleAddEmotion)}
      >
        Thêm cảm xúc
      </Button>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleAddEmotion}
        onClose={() => setVisibleAddEmotion(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm cảm xúc</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên cảm xúc <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên cảm xúc..."
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.name} </p>
                ) : null}
                <CFormLabel htmlFor="icon" className="col-sm-12 col-form-label">
                  <b>
                    File <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  id="icon"
                  type="file"
                  name="icon"
                  // value={formik.values.file}
                  onChange={(event) => formik.setFieldValue('icon', event.currentTarget.files[0])}
                />
                {formik.errors.icon && <p className="formik-text-size text-danger mt-1"> {formik.errors.icon} </p>}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddEmotion(false)}>
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

export default AddEmotionModal;
