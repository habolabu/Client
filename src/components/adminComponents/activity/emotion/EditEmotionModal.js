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

import parkingServices from 'src/api/buildingServices/parkingServices';

import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import { MdEdit } from 'react-icons/md';
import { Button } from '@mui/material';

const EditEmotionModal = ({ apartmentId, submitEditParkingChange, ...rest }) => {
  const [visibleEditParking, setVisibleEditParking] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: rest.parkingName,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên bãi đỗ xe !').min(6, 'Tối thiểu 6 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          id: rest.parkingId,
          name: values.name,
          apartmentId: apartmentId,
        };

        const res = await parkingServices.updateParking(params);
        if (res && res.data) {
          toast.success('Sửa thành công !', { theme: 'colored' });
          setVisibleEditParking(false);
          submitEditParkingChange();
        } else {
          toast.error('Sửa thất bại !', {
            theme: 'colored',
          });
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
        <Button
          variant="contained"
          color="info"
          endIcon={<MdEdit />}
          size="small"
          className="ms-2"
          onClick={() => setVisibleEditParking(!visibleEditParking)}
        >
          Sửa
        </Button>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleEditParking}
        onClose={() => setVisibleEditParking(false)}
      >
        <CModalHeader>
          <CModalTitle>Sửa thông tin bãi đỗ xe</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={formik.handleSubmit}>
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
            <CButton color="secondary" onClick={() => setVisibleEditParking(false)}>
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

export default EditEmotionModal;
