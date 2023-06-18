// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CCard, CCardBody, CCardHeader, CCol, CContainer, CFormInput, CFormLabel, CRow } from '@coreui/react';

import userServices from 'src/api/humanServices/userServices';

import { toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { FaUserEdit } from 'react-icons/fa';

import Helmet from 'src/components/helmet/helmet';
import Avatar from './Avatar';
import Emergency from './Emergency';
import ParkingDetail from './ParkingDetail';
import RoomDetail from './RoomDetail';

const AccountDetail = () => {
  const url = useParams();
  const [userInfo, setUserInfo] = useState(null);

  const getUserDetails = async () => {
    try {
      const res = await userServices.getUserDetails(url.userId);
      if (res && res.data) {
        setUserInfo(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy thông tin chi tiết tài khoản ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy thông tin chi tiết tài khoản: ', error);
      toast.error('Thất bại khi lấy thông tin chi tiết tài khoản ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getUserDetails();
  }, [url]);

  return (
    <Helmet title="Thông tin tài khoản">
      {userInfo ? (
        <CContainer>
          <CRow className="align-items-center justify-content-center">
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader className="d-flex align-items-center justify-content-between">
                  <strong>
                    <FaUserEdit /> Thông tin cá nhân - {`${userInfo.lastName} ${userInfo.firstName}`}
                  </strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol lg={6} sm={12} className="mb-2">
                      <CRow>
                        <CFormLabel htmlFor="username" className="col-sm-3 col-form-label">
                          🕵️‍♀️ Họ và tên:
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="username"
                          disabled
                          value={`${userInfo.lastName} ${userInfo.firstName}`}
                          className="flex-1 me-3"
                        />
                      </CRow>
                    </CCol>
                    <CCol lg={6} sm={12} className="mb-2">
                      <CRow>
                        <CFormLabel htmlFor="username" className="col-sm-3 col-form-label">
                          🎭 Giới tính:
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="username"
                          disabled
                          defaultValue={userInfo.gender === 0 ? 'Nữ' : 'Nam'}
                          className="flex-1 me-3"
                        />
                      </CRow>
                    </CCol>
                    <CCol lg={6} sm={12} className="mb-2">
                      <CRow>
                        <CFormLabel htmlFor="username" className="col-sm-3 col-form-label">
                          📅 Ngày sinh:
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="username"
                          disabled
                          defaultValue={userInfo.dateOfBirth ? userInfo.dateOfBirth.slice(0, 10) : ''}
                          className="flex-1 me-3"
                        />
                      </CRow>
                    </CCol>
                    <CCol lg={6} sm={12} className="mb-2">
                      <CRow>
                        <CFormLabel htmlFor="username" className="col-sm-3 col-form-label">
                          📞 Số điện thoại:
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="username"
                          disabled
                          defaultValue={userInfo.phoneNumber}
                          className="flex-1 me-3"
                        />
                      </CRow>
                    </CCol>
                    <CCol lg={6} sm={12} className="mb-2">
                      <CRow>
                        <CFormLabel htmlFor="username" className="col-sm-3 col-form-label">
                          🆔 CCCD:
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="username"
                          disabled
                          defaultValue={userInfo.idCard}
                          className="flex-1 me-3"
                        />
                      </CRow>
                    </CCol>
                    <CCol lg={6} sm={12} className="mb-2">
                      <CRow>
                        <CFormLabel htmlFor="username" className="col-sm-3 col-form-label">
                          📧 Email:
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="username"
                          disabled
                          defaultValue={userInfo.email}
                          className="flex-1 me-3"
                        />
                      </CRow>
                    </CCol>
                    <CCol lg={6} sm={12} className="mb-2">
                      <CRow>
                        <CFormLabel htmlFor="username" className="col-sm-3 col-form-label">
                          🌐 Địa chỉ:
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="username"
                          disabled
                          defaultValue={userInfo.address}
                          className="flex-1 me-3"
                        />
                      </CRow>
                    </CCol>
                    <CCol lg={6} sm={12} className="mb-2">
                      <CRow>
                        <CFormLabel htmlFor="username" className="col-sm-3 col-form-label">
                          🌎 Quốc gia:
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="username"
                          disabled
                          defaultValue={userInfo.nationality}
                          className="flex-1 me-3"
                        />
                      </CRow>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            {/* avatar */}
            <Avatar userId={url.userId} />
            {/* emergency */}
            <Emergency userId={url.userId} />
            {/* avatar */}
            {/* <ParkingDetail userId={url.userId} /> */}
            {/* emergency */}
            {/* <RoomDetail userId={url.userId} /> */}
          </CRow>
        </CContainer>
      ) : (
        <SkeletonTheme color="#202020" highlightColor="#ccc">
          <p className="text-danger fw-bold">Không có thông tin !!!</p>
          <Skeleton count={3} />
        </SkeletonTheme>
      )}
    </Helmet>
  );
};

export default AccountDetail;
