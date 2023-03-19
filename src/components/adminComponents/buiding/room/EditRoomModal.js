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

import roomServices from 'src/api/buildingServices/roomServices';

import { toast } from 'react-toastify';
import priceTagServices from 'src/api/buildingServices/priceTagServices';

import numberWithCommas from 'src/utils/numberWithCommas';
import Tippy from '@tippyjs/react';

const EditRoomModal = ({ submitEditRoomChange, ...rest }) => {
  const [visibleEditRoom, setVisibleEditRoom] = useState(false);
  const [priceTags, setPriceTags] = useState([]);
  const [priceTagId, setPriceTagId] = useState(1);

  useEffect(() => {
    // get price tags
    const getPriceTag = async () => {
      try {
        const res = await priceTagServices.getAllPriceTag();
        if (res.response.message === 'Successful') {
          setPriceTags(res.response.body);
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
      name: rest.name,
      floorNumber: rest.floorNumber,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên phòng !').min(6, 'Tối thiểu 6 ký tự !'),
      floorNumber: Yup.string()
        .required('Vui lòng nhập vị trí !')
        .matches(/^[0-9]*$/, 'Phải là định dạng số !')
        .max(2, 'Tối đa tầng 99 !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          id: rest.roomId,
          name: values.name,
          floorNumber: values.floorNumber,
          apartmentId: rest.apartmentId,
          priceTagId: priceTagId,
        };
        const res = await roomServices.updateRoom(params);
        if (res.response.message === 'Successful') {
          toast.success('Thêm thành công !', { theme: 'colored' });
          setVisibleEditRoom(false);
          submitEditRoomChange();
          formik.values.name = '';
          formik.values.floorAmount = 0;
        } else {
          toast.error('Sửa thất bại !', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Sửa thất bại: ', error.response.data.error.body.message);
        toast.error('Sửa thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Sửa thông tin">
        <CButton color="warning" size="sm" className="ms-2" onClick={() => setVisibleEditRoom(!visibleEditRoom)}>
          <FaEdit />
        </CButton>
      </Tippy>
      <CModal backdrop="static" alignment="center" visible={visibleEditRoom} onClose={() => setVisibleEditRoom(false)}>
        <CModalHeader>
          <CModalTitle>Sửa thông tin phòng</CModalTitle>
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
                    Vị trí (tầng) <span className="text-danger">*</span>
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
            <CButton color="secondary" onClick={() => setVisibleEditRoom(false)}>
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

export default EditRoomModal;
