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
import { BiPlusMedical } from 'react-icons/bi';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import authServices from 'src/api/auth/authServices';

const AddRoleModal = ({ submitAddRoleChange }) => {
  const [visibleAddRole, setVisibleAddRole] = useState(false);

  const formik = useFormik({
    initialValues: {
      display: '',
    },
    validationSchema: Yup.object({
      display: Yup.string().required('Vui lòng nhập tên vai trò !').min(5, 'Tối thiểu 5 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          display: values.display,
        };
        const res = await authServices.addRole(params);
        console.log(res);
        if (res.hasOwnProperty('error')) {
          toast.error('Thông tin bị trùng.Thêm thất bại ! ', {
            theme: 'colored',
          });
        } else if (res && res.data) {
          toast.success('Thêm thành công !', { theme: 'colored' });
          setVisibleAddRole(false);
          submitAddRoleChange();
        }
      } catch (error) {
        console.log('Thêm thất bại: ', error);
        toast.error('Thêm thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Thêm vai trò">
        <CButton color="success" size="sm" onClick={() => setVisibleAddRole(!visibleAddRole)}>
          Thêm <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal backdrop="static" alignment="center" visible={visibleAddRole} onClose={() => setVisibleAddRole(false)}>
        <CModalHeader>
          <CModalTitle>Thêm vai trò mới</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên vai trò mới <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="display"
                  name="display"
                  placeholder="Nhập tên vai trò mới..."
                  {...formik.getFieldProps('display')}
                />
                {formik.touched.display && formik.errors.display ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.display} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddRole(false)}>
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

export default AddRoleModal;
