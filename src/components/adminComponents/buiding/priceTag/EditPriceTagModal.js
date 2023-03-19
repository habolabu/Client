/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

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

import priceTagServices from 'src/api/buildingServices/priceTagServices';

import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';

const EditPriceTagModal = ({ priceTagId, slug, submitEditPriceTagChange }) => {
  const [visibleEditPriceTag, setVisibleEditPriceTag] = useState(false);

  useEffect(() => {
    // get price tags
    const getPriceTag = async () => {
      try {
        const res = await priceTagServices.getPriceTagDetails(slug);
        if (res.response.message === 'Successful') {
          formik.values.name = res.response.body.name;
          formik.values.pricePerDay = res.response.body.pricePerDay;
        } else {
          toast.error('Thất bại khi lấy danh sách giá cả ! ', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thất bại khi lấy danh sách giá cả: ', error);
        toast.error('Thất bại khi lấy danh sách giá cả ! ', { theme: 'colored' });
      }
    };

    getPriceTag();
  }, [slug]);

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
          id: priceTagId,
          name: values.name,
          pricePerDay: values.pricePerDay,
        };
        const res = await priceTagServices.updatePriceTag(params);
        if (res.response.message === 'Successful') {
          toast.success('Sửa thành công !', { theme: 'colored' });
          setVisibleEditPriceTag(false);
          submitEditPriceTagChange();
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
        <CButton
          color="warning"
          size="sm"
          className="ms-2"
          onClick={() => setVisibleEditPriceTag(!visibleEditPriceTag)}
        >
          <FaEdit />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleEditPriceTag}
        onClose={() => setVisibleEditPriceTag(false)}
      >
        <CModalHeader>
          <CModalTitle>Sửa thông tin giá</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên giá<span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên giá ..."
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
            <CButton color="secondary" onClick={() => setVisibleEditPriceTag(false)}>
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

export default EditPriceTagModal;
