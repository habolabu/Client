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
import { FaEdit } from 'react-icons/fa';
import Tippy from '@tippyjs/react';

const EditParkingTypeModal = ({ slug, submitEditParkingTypeChange }) => {
  const [visibleEditParkingType, setVisibleEditParkingType] = useState(false);
  const [priceTagId, setPriceTagId] = useState(1);
  const [priceTags, setPriceTags] = useState([]);

  // get price tags
  useEffect(() => {
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

  const getParkingTypeDetails = async () => {
    try {
      const res = await parkingTypeServices.getParkingTypeDetails(slug);

      if (res.response.message === 'Successful') {
        formik.values.id = res.response.body.id;
        formik.values.name = res.response.body.name;
      } else {
        toast.error('Thất bại khi lấy thông tin chi tiết bãi đỗ xe ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy thông tin chi tiết bãi đỗ xe : ', error);
      toast.error('Thất bại khi lấy thông tin chi tiết bãi đỗ xe ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getParkingTypeDetails();
  }, [slug]);

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
          id: formik.values.id,
          name: values.name,
          priceTagId: priceTagId,
        };
        const res = await parkingTypeServices.updateParkingType(params);
        if (res.response.message === 'Successful') {
          toast.success('Sửa thành công !', { theme: 'colored' });
          setVisibleEditParkingType(false);
          submitEditParkingTypeChange();
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
          onClick={() => setVisibleEditParkingType(!visibleEditParkingType)}
        >
          <FaEdit />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleEditParkingType}
        onClose={() => setVisibleEditParkingType(false)}
      >
        <CModalHeader>
          <CModalTitle>Sửa thông tin khu vực đỗ xe</CModalTitle>
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
            <CButton color="secondary" onClick={() => setVisibleEditParkingType(false)}>
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

export default EditParkingTypeModal;
