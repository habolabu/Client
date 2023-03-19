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

import areaServices from 'src/api/buildingServices/areaServices';

import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';

const AddArea = ({ submitAddAreaChange }) => {
  const [visibleAddArea, setVisibleAddArea] = useState(false);

  const formik = useFormik({
    initialValues: {
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
          name: values.name,
          address: values.address,
        };
        const res = await areaServices.addArea(params);
        if (res.response.message === 'Successful') {
          toast.success('Thêm thành công ! ', { theme: 'colored' });
          setVisibleAddArea(false);
          submitAddAreaChange();
        }
      } catch (error) {
        console.log('Thất bại khi gửi dữ liệu: ', error);
        toast.error('Thất bại khi gửi dữ liệu ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Thêm khu vực">
        <CButton color="success" size="sm" onClick={() => setVisibleAddArea(!visibleAddArea)}>
          Thêm <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal backdrop="static" alignment="center" visible={visibleAddArea} onClose={() => setVisibleAddArea(false)}>
        <CModalHeader>
          <CModalTitle>Thêm khu vực</CModalTitle>
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
            <CButton color="secondary" onClick={() => setVisibleAddArea(false)}>
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

export default AddArea;
