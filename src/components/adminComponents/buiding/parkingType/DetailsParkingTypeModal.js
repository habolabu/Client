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
import { BiSearchAlt } from 'react-icons/bi';

import parkingTypeServices from 'src/api/buildingServices/parkingTypeServices';

import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import numberWithCommas from 'src/utils/numberWithCommas';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const DetailsParkingTypeModal = ({ slug }) => {
  const [visibleDetailsParkingType, setVisibleDetailsParkingType] = useState(false);
  const [parkingTypeInfo, setParkingTypeInfo] = useState(null);

  useEffect(() => {
    const getParkingTypeDetails = async () => {
      try {
        const res = await parkingTypeServices.getParkingTypeDetails(slug);
        if (res.response.message === 'Successful') {
          setParkingTypeInfo(res.response.body);
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

    getParkingTypeDetails();
  }, [slug]);

  return (
    <>
      <Tippy content="Xem chi tiết">
        <CButton size="sm" color="info" onClick={() => setVisibleDetailsParkingType(!visibleDetailsParkingType)}>
          <BiSearchAlt />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDetailsParkingType}
        onClose={() => setVisibleDetailsParkingType(false)}
      >
        <CModalHeader>
          <CModalTitle>Thông tin khu vực đỗ xe</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {parkingTypeInfo ? (
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên khu vực đỗ xe <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput type="text" id="name" name="name" value={parkingTypeInfo.name} disabled />
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Giá thuê/ngày <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  value={numberWithCommas(parkingTypeInfo.priceTag.pricePerDay) + ' vnđ'}
                  disabled
                />
              </CCol>
            </CRow>
          ) : (
            <SkeletonTheme color="#202020" highlightColor="#ccc">
              <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
              <Skeleton count={5} />
            </SkeletonTheme>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDetailsParkingType(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DetailsParkingTypeModal;
