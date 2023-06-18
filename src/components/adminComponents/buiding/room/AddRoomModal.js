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

import roomServices from 'src/api/buildingServices/roomServices';

import { toast } from 'react-toastify';
import priceTagServices from 'src/api/buildingServices/priceTagServices';

import numberWithCommas from 'src/utils/numberWithCommas';
import { BiPlusMedical } from 'react-icons/bi';
import Tippy from '@tippyjs/react';

const AddRoomModal = ({ apartmentId, submitAddRoomChange }) => {
  const [visibleAddRoom, setVisibleAddRoom] = useState(false);
  const [priceTags, setPriceTags] = useState([]);
  const [priceTagId, setPriceTagId] = useState(1);

  useEffect(() => {
    // get all price tags
    const getPriceTag = async () => {
      try {
        const res = await priceTagServices.getAllPriceTag();
        if (res && res.data) {
          setPriceTags(res.data.response.body);
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
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      floorNumber: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên phòng !').min(6, 'Tối thiểu 6 ký tự !'),
      floorNumber: Yup.string()
        .required('Vui lòng nhập vị trí !')
        .matches(/^[0-9]*$/, 'Phải là định dạng số !')
        .max(1, 'Tối đa tầng 9 !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          name: values.name,
          floorNumber: values.floorNumber,
          apartmentId: apartmentId,
          priceTagId: priceTagId,
        };
        const res = await roomServices.addRoom(params);
        if (res && res.data) {
          toast.success('Thêm thành công !', { theme: 'colored' });
          setVisibleAddRoom(false);
          submitAddRoomChange();
          formik.values.name = '';
          formik.values.floorAmount = 0;
        } else {
          toast.error('Thêm thất bại !', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thêm thất bại: ', error.response.data.error.body.message);
        toast.error('Thêm thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Thêm phòng">
        <CButton
          color="success"
          size="sm"
          className="me-2"
          onClick={() => {
            setVisibleAddRoom(!visibleAddRoom);
          }}
        >
          Thêm <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal backdrop="static" alignment="center" visible={visibleAddRoom} onClose={() => setVisibleAddRoom(false)}>
        <CModalHeader>
          <CModalTitle>Thêm phòng</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên phòng <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên phòng..."
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.name} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="floorNumber" className="col-sm-12 col-form-label">
                  <b>
                    Vị trí (tầng)<span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="floorNumber"
                  name="floorNumber"
                  placeholder="Nhập địa chỉ ..."
                  {...formik.getFieldProps('floorNumber')}
                />
                {formik.touched.floorNumber && formik.errors.floorNumber ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.floorNumber} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="floorNumber" className="col-sm-12 col-form-label">
                  <b>
                    Giá phòng <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                {priceTags ? (
                  <CFormSelect
                    aria-label="Default select example"
                    onChange={(e) => {
                      const selectedPrice = e.target.value;
                      setPriceTagId(selectedPrice);
                    }}
                  >
                    {priceTags.map((priceTag) => {
                      return (
                        <option key={priceTag.id} value={priceTag.id}>
                          Phòng {priceTag.name} - Giá: {numberWithCommas(priceTag.pricePerDay)} vnđ/ngày
                        </option>
                      );
                    })}
                  </CFormSelect>
                ) : (
                  <p>Đang lấy giá phòng...</p>
                )}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddRoom(false)}>
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

export default AddRoomModal;
