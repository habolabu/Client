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

import apartmentServices from 'src/api/buildingServices/apartmentServices';

import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';

const EditApartment = ({ areaId, slug, submitEditApartmentChange }) => {
  const [visibleEditApartment, setVisibleEditApartment] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      floorAmount: 0,
      areaId: areaId,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên khu vực !').min(6, 'Tối thiểu 6 ký tự !'),
      floorAmount: Yup.string()
        .required('Vui lòng điền số lượng phòng !')
        .matches(/^[0-9]*$/, 'Phải là định dạng số !')
        .max(2, 'Tối đa 99 phòng'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          id: formik.values.id,
          name: values.name,
          floorAmount: values.floorAmount,
          areaId: areaId,
        };

        const res = await apartmentServices.updateApartment(params);
        if (res && res.data) {
          toast.success('Sửa thành công !', { theme: 'colored' });
          setVisibleEditApartment(false);
          submitEditApartmentChange();
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

  useEffect(() => {
    const getApartmentDetails = async () => {
      try {
        const res = await apartmentServices.getApartmentDetails(slug);
        if (res && res.data) {
          formik.values.id = res.data.response.body.id;
          formik.values.name = res.data.response.body.name;
          formik.values.floorAmount = res.data.response.body.floorAmount;
        } else {
          toast.error('Sửa thông tin thất bại ! ', { theme: 'colored' });
        }
      } catch (error) {
        console.log('Sửa thông tin thất bại: ', error);
        toast.error('Sửa thông tin thất bại ! ', { theme: 'colored' });
      }
    };
    getApartmentDetails();
  }, [slug]);

  return (
    <>
      <Tippy content="Sửa thông tin chung cư">
        <CButton
          color="warning"
          size="sm"
          className="ms-2"
          onClick={() => {
            setVisibleEditApartment(!visibleEditApartment);
          }}
        >
          <FaEdit />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleEditApartment}
        onClose={() => setVisibleEditApartment(false)}
      >
        <CModalHeader>
          <CModalTitle>Sửa thông tin chung cư</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên chung cư <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên chung cư..."
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.name} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="floorAmount" className="col-sm-12 col-form-label">
                  <b>
                    Số lượng phòng<span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="floorAmount"
                  name="floorAmount"
                  placeholder="Nhập số lượng phòng ..."
                  {...formik.getFieldProps('floorAmount')}
                />
                {formik.touched.floorAmount && formik.errors.floorAmount ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.floorAmount} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEditApartment(false)}>
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

export default EditApartment;
