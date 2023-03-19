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

import parkingSpaceServices from 'src/api/buildingServices/parkingSpaceServices';
import parkingTypeServices from 'src/api/buildingServices/parkingTypeServices';

import { toast } from 'react-toastify';
import { BiPlusMedical } from 'react-icons/bi';
import Tippy from '@tippyjs/react';

const AddParkingSpaceModal = ({ parkingId, submitAddParkingSpaceChange }) => {
  const [visibleAddParkingSpace, setVisibleAddParkingSpace] = useState(false);
  const [parkingTypes, setParkingTypes] = useState([]);
  const [parkingTypeId, setParkingTypeId] = useState(1);

  const getParkingType = async () => {
    try {
      const res = await parkingTypeServices.getAllParkingType();
      if (res.response.message === 'Successful') {
        setParkingTypes(res.response.body);
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
  useEffect(() => {
    getParkingType();
  }, []);

  const formik = useFormik({
    initialValues: {
      capacity: 0,
    },
    validationSchema: Yup.object({
      capacity: Yup.string()
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
        };
        const res = await parkingSpaceServices.addParkingSpace(params);
        if (res.response.message === 'Successful') {
          toast.success('Thêm thành công !', { theme: 'colored' });
          setVisibleAddParkingSpace(false);
          submitAddParkingSpaceChange();
        } else if (res.error.message !== undefined) {
          toast.error('Thông tin bị trùng.Thêm thất bại !', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thêm thất bại: ', error);
        toast.error('Thêm thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Thêm bãi đỗ xe">
        <CButton
          color="success"
          size="sm"
          onClick={() => {
            setVisibleAddParkingSpace(!visibleAddParkingSpace);
            getParkingType();
          }}
        >
          Thêm <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleAddParkingSpace}
        onClose={() => setVisibleAddParkingSpace(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm khu vực đỗ xe</CModalTitle>
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
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddParkingSpace(false)}>
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

export default AddParkingSpaceModal;
