/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

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
import { BiPlusMedical } from 'react-icons/bi';

import { toast } from 'react-toastify';

import avatarServices from 'src/api/humanServices/avatarServices';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Tippy from '@tippyjs/react';

const AddAvatarModal = ({ submitAddAvatarChange }) => {
  const [visibleAddAvatar, setVisibleAddAvatar] = useState(false);

  const formik = useFormik({
    initialValues: {
      image: File,
    },
    validationSchema: Yup.object().shape({
      image: Yup.mixed().required('Vui lòng upload hình !'),
    }),
    onSubmit: async (values) => {
      let loadingLogin = document.getElementById('loadingLogin');
      loadingLogin.classList.add('show');

      try {
        var bodyFormData = new FormData();
        bodyFormData.append('image', values.image);
        const res = await avatarServices.addAvatar(bodyFormData);
        if (res.status === 200) {
          toast.success('Thêm thành công !', { theme: 'colored' });
          loadingLogin.classList.remove('show');
          setVisibleAddAvatar(false);
          submitAddAvatarChange();
        } else if (res.error.message !== undefined) {
          toast.error('Thông tin bị trùng.Thêm thất bại !', {
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
      <Tippy content="Thêm ảnh">
        <CButton
          size="sm"
          color="success"
          onClick={() => {
            setVisibleAddAvatar(!visibleAddAvatar);
          }}
        >
          Thêm <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleAddAvatar}
        onClose={() => setVisibleAddAvatar(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm ảnh mới</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="image" className="col-sm-12 col-form-label">
                  <b>
                    Vui lòng chọn ảnh <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  id="image"
                  type="file"
                  name="image"
                  // value={formik.values.file}
                  onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
                />
                {formik.errors.image && <p className="formik-text-size text-danger mt-1"> {formik.errors.image} </p>}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddAvatar(false)}>
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

export default AddAvatarModal;
