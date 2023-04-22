// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { CButton, CImage, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import { BsEyeFill } from 'react-icons/bs';

import { toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import avatarServices from 'src/api/humanServices/avatarServices';
import Tippy from '@tippyjs/react';

const DetailsAvatarModal = ({ avatarId }) => {
  const [visibleDetailsAvatar, setVisibleDetailsAvatar] = useState(false);
  const [avatar, setAvatar] = useState([]);

  const getAvatarDetails = async () => {
    try {
      const res = await avatarServices.getAvatarDetails(avatarId);
      if (res && res.data) {
        setAvatar(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy avatar ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy avatar: ', error);
      toast.error('Thất bại khi lấy avatar ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getAvatarDetails();
  }, [avatarId]);

  return (
    <>
      <Tippy content="Xem chi tiết">
        <CButton
          size="sm"
          color="info"
          onClick={() => {
            setVisibleDetailsAvatar(!visibleDetailsAvatar);
            getAvatarDetails();
          }}
        >
          <BsEyeFill />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDetailsAvatar}
        onClose={() => setVisibleDetailsAvatar(false)}
      >
        <CModalHeader>
          <CModalTitle>Thông tin ảnh</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {avatar ? (
            <CRow className="align-items-center justify-content-center">
              <CImage fluid src={avatar.url} />
            </CRow>
          ) : (
            <SkeletonTheme color="#202020" highlightColor="#ccc">
              <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
              <Skeleton count={5} />
            </SkeletonTheme>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDetailsAvatar(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DetailsAvatarModal;
