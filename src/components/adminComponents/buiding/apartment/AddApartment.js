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
import { BiPlusMedical } from 'react-icons/bi';

import apartmentServices from 'src/api/buildingServices/apartmentServices';

import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';

const AddApartment = ({ areaId, submitAddApartmentChange }) => {
  const [visibleAddApartment, setVisibleAddApartment] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      floorAmount: 0,
      areaId: areaId,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên chung cư !').min(6, 'Tối thiểu 6 ký tự !'),
      floorAmount: Yup.string()
        .required('Vui lòng điền số lượng phòng !')
        .matches(/^[0-9]*$/, 'Phải là định dạng số !')
        .max(2, 'Tối đa 99 phòng !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          name: values.name,
          floorAmount: values.floorAmount,
          areaId: areaId,
        };
        const res = await apartmentServices.addApartment(params);

        if (res.response.message === 'Successful') {
          toast.success('Thêm thành công !', { theme: 'colored' });
          setVisibleAddApartment(false);
          submitAddApartmentChange();
          formik.values.name = '';
          formik.values.floorAmount = 0;
        } else {
          toast.error('Thêm thất bại !', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thêm thất bại: ', error);
        toast.error('Thêm thất bại ! ', {
          theme: 'colored',
        });
      }
    },
  });

  return (
    <>
      <Tippy content="Thêm chung cư">
        <CButton color="success" size="sm" onClick={() => setVisibleAddApartment(!visibleAddApartment)}>
          Thêm <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleAddApartment}
        onClose={() => setVisibleAddApartment(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm chung cư</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên chưng cư <span className="text-danger">*</span>
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
                    Số lượng phòng <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="floorAmount"
                  name="floorAmount"
                  placeholder="Nhập số lượng phòng..."
                  {...formik.getFieldProps('floorAmount')}
                />
                {formik.touched.floorAmount && formik.errors.floorAmount ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.floorAmount} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddApartment(false)}>
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

export default AddApartment;
