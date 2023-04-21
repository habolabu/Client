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

import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import feedBackTypeServices from 'src/api/activityServices/feedBackTypeServices';

const EditFeedbackTypeModal = ({ slug, submitEditFeedBackTypeChange }) => {
  const [visibleEditFeedBackType, setVisibleEditFeedBackType] = useState(false);

  useEffect(() => {
    const getFeedBackTypeDetails = async () => {
      try {
        const res = await feedBackTypeServices.getFeedBackTypeDetails(slug);
        if (res && res.data) {
          formik.values.id = res.data.response.body.id;
          formik.values.name = res.data.response.body.name;
        } else {
          toast.error('Thất bại khi lấy thông tin loại phản hồi! ', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thất bại khi lấy thông tin loại phản hồi: ', error);
        toast.error('Thất bại khi lấy thông tin loại phản hồi! ', { theme: 'colored' });
      }
    };

    getFeedBackTypeDetails();
  }, [slug]);

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên loại phản hồi !').min(6, 'Tối thiểu 6 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          id: values.id,
          name: values.name,
        };

        const res = await feedBackTypeServices.updateFeedBackType(params);
        if (res && res.data) {
          toast.success('Sửa thành công !', { theme: 'colored' });
          setVisibleEditFeedBackType(false);
          submitEditFeedBackTypeChange();
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
      <Button
        variant="contained"
        color="info"
        endIcon={<MdEdit />}
        size="small"
        className="ms-2"
        onClick={() => setVisibleEditFeedBackType(!visibleEditFeedBackType)}
      >
        Sửa
      </Button>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleEditFeedBackType}
        onClose={() => setVisibleEditFeedBackType(false)}
      >
        <CModalHeader>
          <CModalTitle>Sửa thông tin loại phản hồi</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên loại phản hồi <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên loại phản hồi..."
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.name} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEditFeedBackType(false)}>
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

export default EditFeedbackTypeModal;
