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

import areaServices from 'src/api/buildingServices/areaServices';

import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';

const EditArea = ({ slug, submitEditAreaChange }) => {
  const [visibleEditArea, setVisibleEditArea] = useState(false);

  useEffect(() => {
    const getAreaDetails = async () => {
      try {
        const res = await areaServices.getAreaDetails(slug);
        if (res && res.data) {
          formik.values.name = res.data.response.body.name;
          formik.values.address = res.data.response.body.address;
          formik.values.id = res.data.response.body.id;
        } else {
          toast.error('Thất bại khi lấy thông tin chi tiết khu vực ! ', { theme: 'colored' });
        }
      } catch (error) {
        console.log('Thất bại khi lấy thông tin chi tiết khu vực: ', error);
        toast.error('Thất bại khi lấy thông tin chi tiết khu vực ! ', { theme: 'colored' });
      }
    };
    getAreaDetails();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên khu vực !').min(6, 'Tối thiểu 6 ký tự !'),
      address: Yup.string().required('Vui lòng nhập địa chỉ !').min(6, 'Tối thiểu 6 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          id: values.id,
          name: values.name,
          address: values.address,
        };
        const res = await areaServices.updateArea(params);
        if (res && res.data) {
          toast.success('Cập nhật thành công ! ', { theme: 'colored' });
          setVisibleEditArea(false);
          submitEditAreaChange();
        }
      } catch (error) {
        console.log('Thất bại khi gửi dữ liệu: ', error);
        toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Sửa khu vực">
        <CButton color="info" size="sm" className="me-2" onClick={() => setVisibleEditArea(!visibleEditArea)}>
          <FaEdit />
        </CButton>
      </Tippy>
      <CModal backdrop="static" alignment="center" visible={visibleEditArea} onClose={() => setVisibleEditArea(false)}>
        <CModalHeader>
          <CModalTitle>Sửa thông tin khu vực</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên khu vực <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên..."
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
                  placeholder="Nhập địa chỉ ..."
                  {...formik.getFieldProps('address')}
                />
                {formik.touched.address && formik.errors.address ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.address} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEditArea(false)}>
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

export default EditArea;
