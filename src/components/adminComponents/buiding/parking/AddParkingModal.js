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

import parkingServices from 'src/api/buildingServices/parkingServices';

import { toast } from 'react-toastify';
import { BiPlusMedical } from 'react-icons/bi';
import Tippy from '@tippyjs/react';

const AddParkingModal = ({ apartmentId, submitAddParkingChange }) => {
  const [visibleAddParking, setVisibleAddParking] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên bãi đỗ xe !').min(6, 'Tối thiểu 6 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          apartmentId: apartmentId,
          name: values.name,
        };
        const res = await parkingServices.addParking(params);
        if (res && res.data) {
          toast.success('Thêm thành công ! ', { theme: 'colored' });
          setVisibleAddParking(false);
          submitAddParkingChange();
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
      <Tippy content="Thêm bãi đỗ xe">
        <CButton color="success" size="sm" className="me-2" onClick={() => setVisibleAddParking(!visibleAddParking)}>
          Thêm <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleAddParking}
        onClose={() => setVisibleAddParking(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm bãi đỗ xe</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên bãi đỗ xe <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên bãi đỗ xe..."
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.name} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddParking(false)}>
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

export default AddParkingModal;
