/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';

import roomServices from 'src/api/buildingServices/roomServices';
import numberWithCommas from 'src/utils/numberWithCommas';

import { BiSearchAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Tippy from '@tippyjs/react';

const DetailsRoomModal = ({ slug }) => {
  const [visibleDetailsRoom, setVisibleDetailsRoom] = useState(false);
  const [roomInfo, setRoomInfo] = useState(null);

  const getRoomDetails = async () => {
    try {
      const res = await roomServices.getRoomDetails(slug);
      if (res.response.message === 'Successful') {
        setRoomInfo(res.response.body);
      } else {
        toast.error('Thất bại khi lấy thông tin chi tiết phòng ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy thông tin chi tiết phòng: ', error);
      toast.error('Thất bại khi lấy thông tin chi tiết phòng ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getRoomDetails();
  }, [slug]);

  return (
    <>
      <Tippy content="Xem chi tiết">
        <CButton
          size="sm"
          color="info"
          onClick={() => {
            setVisibleDetailsRoom(!visibleDetailsRoom);
            getRoomDetails();
          }}
        >
          <BiSearchAlt />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDetailsRoom}
        onClose={() => setVisibleDetailsRoom(false)}
      >
        <CModalHeader>
          <CModalTitle>Thông tin phòng tên phòng </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {roomInfo ? (
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <p>
                  <b>🏠 Tên phòng: </b> {roomInfo.name}
                </p>
                <p>
                  <b>📌 Vị trí (tầng): </b> {roomInfo.floorNumber}
                </p>
                <p>
                  <b>💰 Giá (tính theo ngày): </b> {numberWithCommas(roomInfo.price.pricePerDay)} vnđ
                </p>
                <div>
                  <b>📝 Thông tin chủ sở hữu:</b>
                  <ul>
                    <li>
                      <b>Họ và tên: </b> {roomInfo.owner.ownerInfo.lastName} {roomInfo.owner.ownerInfo.firstName}
                    </li>
                    <li>
                      <b>Giới tính: </b> {roomInfo.owner.ownerInfo.gender === 0 ? 'Nữ' : 'Nam'}
                    </li>
                    <li>
                      <b>Ngày sinh: </b> {new Date(roomInfo.owner.ownerInfo.dateOfBirth).toLocaleDateString('vi-Vi')}
                    </li>
                    <li>
                      <b>Địa chỉ: </b> {roomInfo.owner.ownerInfo.address}
                    </li>
                    <li>
                      <b>Quốc tịch: </b> {roomInfo.owner.ownerInfo.nationality}
                    </li>
                    <li>
                      <b>CCCD: </b> {roomInfo.owner.ownerInfo.idCard}
                    </li>
                    <li>
                      <b>Số điện thoại: </b> {roomInfo.owner.ownerInfo.phoneNumber}
                    </li>
                    <li>
                      <b>Email: </b> {roomInfo.owner.ownerInfo.email}
                    </li>
                    <li>
                      <b>Ngày tạo: </b> {new Date(roomInfo.owner.ownerInfo.createdAt).toLocaleDateString('vi-Vi')}
                    </li>
                    <li>
                      <b>Ngày vào: </b> {roomInfo.owner.joinDate.slice(0, 10)}
                    </li>
                    <li>
                      <b>Ngày rời: </b>
                      {roomInfo.owner.leaveDate ? roomInfo.owner.leaveDate.slice(0, 10) : 'Chưa cập nhật'}
                    </li>
                  </ul>
                </div>
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
          <CButton color="secondary" onClick={() => setVisibleDetailsRoom(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DetailsRoomModal;
