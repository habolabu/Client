// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
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
import { FaEdit } from 'react-icons/fa';

import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import authServices from 'src/api/auth/authServices';

const UpdateRoleModal = ({ roleData, submitUpdateRoleChange }) => {
  const [visibleEditRole, setVisibleEditRole] = useState(false);

  const formik = useFormik({
    initialValues: {
      display: roleData.display,
    },
    validationSchema: Yup.object({
      display: Yup.string().required('Vui lòng nhập tên !').min(5, 'Tối thiểu 5 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          id: roleData.id,
          display: values.display,
        };
        const res = await authServices.updateRole(params);
        if (res && res.data) {
          toast.success('Sửa thành công !', { theme: 'colored' });
          setVisibleEditRole(false);
          submitUpdateRoleChange();
        }
      } catch (error) {
        console.log('Sửa thất bại: ', error);
        toast.error('Sửa thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Sửa thông tin">
        <CButton color="warning" size="sm" className="ms-2" onClick={() => setVisibleEditRole(!visibleEditRole)}>
          <FaEdit />
        </CButton>
      </Tippy>
      <CModal backdrop="static" alignment="center" visible={visibleEditRole} onClose={() => setVisibleEditRole(false)}>
        <CModalHeader>
          <CModalTitle>Sửa thông tin</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên vai trò<span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="display"
                  name="display"
                  placeholder="Nhập tên vai trò ..."
                  {...formik.getFieldProps('display')}
                />
                {formik.touched.display && formik.errors.display ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.display} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEditRole(false)}>
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

export default UpdateRoleModal;
