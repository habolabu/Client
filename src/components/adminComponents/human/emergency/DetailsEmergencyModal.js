/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

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

import { toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';

import emergencyServices from 'src/api/humanServices/emergencyServices';
import Tippy from '@tippyjs/react';

const DetailsEmergencyModal = ({ emergencyId }) => {
  const [visibleDetailsEmergency, setVisibleDetailsEmergency] = useState(false);
  const [emergencyInfo, setEmergencyInfo] = useState([]);

  const getEmergencyDetails = async () => {
    try {
      const res = await emergencyServices.getEmergencyDetails(emergencyId);
      if (res.response.message === 'Successful') {
        setEmergencyInfo(res.response.body);
      } else {
        toast.error('Thất bại khi lấy thông tin liên hệ người khẩn cấp ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy thông tin liên hệ người khẩn cấp: ', error);
      toast.error('Thất bại khi lấy thông tin liên hệ người khẩn cấp ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getEmergencyDetails();
  }, [emergencyId]);

  return (
    <>
      <Tippy content="Xem chi tiết">
        <CButton
          size="sm"
          color="info"
          onClick={() => {
            setVisibleDetailsEmergency(!visibleDetailsEmergency);
            getEmergencyDetails();
          }}
        >
          <BiSearchAlt />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDetailsEmergency}
        onClose={() => setVisibleDetailsEmergency(false)}
      >
        <CModalHeader>
          <CModalTitle>Thông tin liên hệ người khẩn cấp</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="align-items-center justify-content-center">
            <CCol sm={11}>
              <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                <b>
                  Họ và tên <span className="text-danger">*</span>
                </b>
              </CFormLabel>
              <CFormInput type="text" id="name" name="name" value={emergencyInfo.name} disabled />
            </CCol>
            <CCol sm={11}>
              <CFormLabel htmlFor="phoneNumber" className="col-sm-12 col-form-label">
                <b>
                  Số điện thoại <span className="text-danger">*</span>
                </b>
              </CFormLabel>
              <CFormInput type="text" id="phoneNumber" name="phoneNumber" value={emergencyInfo.phoneNumber} disabled />
            </CCol>
            <CCol sm={11}>
              <CFormLabel htmlFor="address" className="col-sm-12 col-form-label">
                <b>
                  Địa chỉ <span className="text-danger">*</span>
                </b>
              </CFormLabel>
              <CFormInput type="text" id="address" name="address" value={emergencyInfo.address} disabled />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDetailsEmergency(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DetailsEmergencyModal;
