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

import priceTagServices from 'src/api/buildingServices/priceTagServices';

import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';

const AddPriceTagModal = ({ submitAddPriceTagChange }) => {
  const [visibleAddPriceTag, setVisibleAddPriceTag] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      pricePerDay: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên giá !').min(5, 'Tối thiểu 5 ký tự !'),
      pricePerDay: Yup.string()
        .required('Vui lòng nhập giá !')
        .matches(/^[0-9]*$/, 'Phải là định dạng số !')
        .max(10, 'Tối đa 10 số !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          name: values.name,
          pricePerDay: values.pricePerDay,
        };
        const res = await priceTagServices.addPriceTag(params);
        console.log(res);
        if (res.hasOwnProperty('error')) {
          toast.error('Thông tin bị trùng.Thêm thất bại ! ', {
            theme: 'colored',
          });
        } else if (res && res.data) {
          toast.success('Thêm thành công !', { theme: 'colored' });
          setVisibleAddPriceTag(false);
          submitAddPriceTagChange();
        }
      } catch (error) {
        console.log('Thêm thất bại: ', error);
        toast.error('Thêm thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Thêm thẻ (tag) giá">
        <CButton color="success" size="sm" onClick={() => setVisibleAddPriceTag(!visibleAddPriceTag)}>
          Thêm <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleAddPriceTag}
        onClose={() => setVisibleAddPriceTag(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm giá mới</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên giá mới <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên giá mới..."
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.name} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="pricePerDay" className="col-sm-12 col-form-label">
                  <b>
                    Giá <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="pricePerDay"
                  name="pricePerDay"
                  placeholder="Nhập giá mới..."
                  {...formik.getFieldProps('pricePerDay')}
                />
                {formik.touched.pricePerDay && formik.errors.pricePerDay ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.pricePerDay} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddPriceTag(false)}>
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

export default AddPriceTagModal;
