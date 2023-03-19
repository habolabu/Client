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

import { toast } from 'react-toastify';
import { BiPlusMedical } from 'react-icons/bi';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import emergencyServices from 'src/api/humanServices/emergencyServices';
import Tippy from '@tippyjs/react';

const AddEmergencyModal = ({ submitAddEmergencyChange }) => {
  const [visibleAddEmergency, setVisibleAddEmergency] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập họ và tên !').min(6, 'Tối thiểu 6 ký tự !'),
      address: Yup.string().required('Vui lòng nhập địa chỉ !').min(6, 'Tối thiểu 6 ký tự !'),
      phoneNumber: Yup.string()
        .required('Vui lòng điền số điện thoại !')
        .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là định dạng số và đủ 10 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          name: values.name,
          address: values.address,
          phoneNumber: values.phoneNumber,
        };
        const res = await emergencyServices.addEmergency(data);
        if (res.hasOwnProperty('error')) {
          toast.error('Thông tin bị trùng.Thêm thất bại !', {
            theme: 'colored',
          });
        } else if (res.response.message === 'Successful') {
          toast.success('Thêm thành công !', { theme: 'colored' });
          setVisibleAddEmergency(false);
          submitAddEmergencyChange();
        } else {
          toast.error('Thêm thất bại ! ', { theme: 'colored' });
        }
      } catch (error) {
        console.log('Thêm thất bại: ', error);
        toast.error('Thêm thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Thêm liên hệ">
        <CButton
          size="sm"
          color="success"
          onClick={() => {
            setVisibleAddEmergency(!visibleAddEmergency);
          }}
        >
          Thêm <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleAddEmergency}
        onClose={() => setVisibleAddEmergency(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm liên hệ mới</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Họ và tên <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập họ và tên..."
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.name} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="address" className="col-sm-12 col-form-label">
                  <b>
                    Địa chỉ <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Nhập địa chỉ..."
                  {...formik.getFieldProps('address')}
                />
                {formik.touched.address && formik.errors.address ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.address} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="phoneNumber" className="col-sm-12 col-form-label">
                  <b>
                    Số điện thoại <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Nhập số điện thoại..."
                  {...formik.getFieldProps('phoneNumber')}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.phoneNumber} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddEmergency(false)}>
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

export default AddEmergencyModal;
