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

import parkingTypeServices from 'src/api/buildingServices/parkingTypeServices';
import priceTagServices from 'src/api/buildingServices/priceTagServices';

import { toast } from 'react-toastify';
import numberWithCommas from 'src/utils/numberWithCommas';
import { BiPlusMedical } from 'react-icons/bi';
import Tippy from '@tippyjs/react';

const AddParkingTypeModal = ({ submitAddParkingTypeChange }) => {
  const [visibleAddParkingType, setVisibleAddParkingType] = useState(false);
  const [priceTagId, setPriceTagId] = useState(1);
  const [priceTags, setPriceTags] = useState([]);

  useEffect(() => {
    // get price tags
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
      priceTagId: priceTagId,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên bãi đỗ xe !').min(6, 'Tối thiểu 6 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          name: values.name,
          priceTagId: priceTagId,
        };
        const res = await parkingTypeServices.addParkingType(params);
        if (res.hasOwnProperty('error')) {
          toast.error('Thông tin bị trùng.Thêm thất bại !', {
            theme: 'colored',
          });
        } else if (res && res.data) {
          toast.success('Thêm thành công !', { theme: 'colored' });
          setVisibleAddParkingType(false);
          submitAddParkingTypeChange();
        }
      } catch (error) {
        console.log('Thêm thất bại: ', error);
        toast.error('Thêm thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Thêm khu vực đỗ xe">
        <CButton color="success" size="sm" onClick={() => setVisibleAddParkingType(!visibleAddParkingType)}>
          Thêm <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleAddParkingType}
        onClose={() => setVisibleAddParkingType(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm khu vực đỗ xe</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên khu vực đỗ xe <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên khu vực đỗ xe..."
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.name} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="floorNumber" className="col-sm-12 col-form-label">
                  <b>
                    Giá <span className="text-danger">*</span>
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
                          {priceTag.name}: {numberWithCommas(priceTag.pricePerDay)} vnđ/ngày
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
            <CButton color="secondary" onClick={() => setVisibleAddParkingType(false)}>
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

export default AddParkingTypeModal;
