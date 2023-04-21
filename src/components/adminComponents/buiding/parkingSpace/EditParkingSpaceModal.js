// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react';
import { FaEdit } from 'react-icons/fa';

import parkingSpaceServices from 'src/api/buildingServices/parkingSpaceServices';
import parkingTypeServices from 'src/api/buildingServices/parkingTypeServices';

import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';

const EditParkingSpaceModal = ({ parkingId, submitEditParkingSpaceChange, ...rest }) => {
  const [visibleEditParkingSpace, setVisibleEditParkingSpace] = useState(false);
  const [parkingTypes, setParkingTypes] = useState([]);
  const [parkingTypeId, setParkingTypeId] = useState(rest.parkingTypeId);

  useEffect(() => {
    const getParkingType = async () => {
      try {
        const res = await parkingTypeServices.getAllParkingType();
        if (res && res.data) {
          setParkingTypes(res.data.response.body);
        } else {
          toast.error('Thất bại khi lấy danh sách loại khu vực đỗ xe ! ', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thất bại khi lấy danh sách loại khu vực đỗ xe: ', error);
        toast.error('Thất bại khi lấy danh sách loại khu vực đỗ xe ! ', { theme: 'colored' });
      }
    };
    getParkingType();
  }, []);

  const formik = useFormik({
    initialValues: {
      capacity: rest.capacity,
      availableSpace: rest.availableSpace,
    },
    validationSchema: Yup.object({
      capacity: Yup.string()
        .required('Vui lòng điền sức chứa !')
        .matches(/^[0-9]*$/, 'Phải là định dạng số !')
        .max(2, 'Tối đa 99 !'),
      availableSpace: Yup.string()
        .required('Vui lòng điền sức chứa !')
        .matches(/^[0-9]*$/, 'Phải là định dạng số !')
        .max(2, 'Tối đa 99 !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          capacity: values.capacity,
          referenceKey: {
            parkingId: parkingId,
            parkingTypeId: parkingTypeId,
          },
          availableSpace: values.availableSpace,
        };

        const res = await parkingSpaceServices.updateParkingSpace(params);
        if (res && res.data) {
          toast.success('Sửa thành công !', { theme: 'colored' });
          setVisibleEditParkingSpace(false);
          submitEditParkingSpaceChange();
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
          onClick={() => setVisibleEditParkingSpace(!visibleEditParkingSpace)}
        >
          <FaEdit />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleEditParkingSpace}
        onClose={() => setVisibleEditParkingSpace(false)}
      >
        <CModalHeader>
          <CModalTitle>Sửa khu vực đỗ xe</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="floorNumber" className="col-sm-12 col-form-label">
                  <b>
                    Tên khu vực đỗ xe <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                {parkingTypes ? (
                  <CFormSelect
                    aria-label="Default select example"
                    onChange={(e) => {
                      const selectedPrice = e.target.value;
                      setParkingTypeId(selectedPrice);
                    }}
                    defaultValue={rest.parkingTypeId}
                  >
                    {parkingTypes.map((parkingType) => {
                      return (
                        <option key={parkingType.id} value={parkingType.id}>
                          {parkingType.name}
                        </option>
                      );
                    })}
                  </CFormSelect>
                ) : (
                  <p>Đang lấy khu vực đỗ xe...</p>
                )}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="capacity" className="col-sm-12 col-form-label">
                  <b>
                    Sức chứa <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="capacity"
                  name="capacity"
                  placeholder="Nhập sức chứa..."
                  {...formik.getFieldProps('capacity')}
                />
                {formik.touched.capacity && formik.errors.capacity ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.capacity} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="availableSpace" className="col-sm-12 col-form-label">
                  <b>
                    Số lượng còn lại <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="availableSpace"
                  name="availableSpace"
                  placeholder="Nhập số lượng còn lại..."
                  {...formik.getFieldProps('availableSpace')}
                />
                {formik.touched.availableSpace &&
                formik.values.availableSpace >= formik.values.capacity &&
                formik.errors.availableSpace ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.availableSpace} </p>
                ) : null}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEditParkingSpace(false)}>
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

export default EditParkingSpaceModal;
