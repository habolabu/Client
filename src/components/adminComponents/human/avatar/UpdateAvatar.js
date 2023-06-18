// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React from 'react';
import { CButton } from '@coreui/react';
import { toast } from 'react-toastify';
import avatarServices from 'src/api/humanServices/avatarServices';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Tippy from '@tippyjs/react';
import { useDispatch } from 'react-redux';

const UpdateAvatar = ({ avatarId }) => {
  const dispatch = useDispatch();

  const getAvatarUser = async () => {
    try {
      const res = await avatarServices.getLogoCurrentUser();
      if (res && res.data) {
        dispatch({
          type: 'set',
          avatarUser: res.data.response.body.avatar,
        });
      } else {
        console.log('Thất bại khi lấy avatar tài khoản: ');
      }
    } catch (error) {
      console.log('Thất bại khi lấy avatar tài khoản: ', error);
    }
  };

  const handleChooseAvatar = async () => {
    let loadingLogin = document.getElementById('loadingLogin');
    try {
      loadingLogin.classList.add('show');
      const res = await avatarServices.updateAvatar({ id: avatarId });
      if (res.hasOwnProperty('error')) {
        loadingLogin.classList.remove('show');
        toast.error('Cập nhật ảnh thất bại. Vui lòng thử lại sau ! ', {
          theme: 'colored',
        });
      } else if (res && res.data) {
        getAvatarUser();
        loadingLogin.classList.remove('show');
        toast.success('Cập nhật ảnh thành công ! ', {
          theme: 'colored',
        });
      } else {
        loadingLogin.classList.remove('show');
        toast.error('Cập nhật ảnh thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      loadingLogin.classList.remove('show');
      console.log('Cập nhật ảnh thất bại: ', error);
      toast.error('Cập nhật ảnh thất bại ! ', { theme: 'colored' });
    }
  };

  return (
    <>
      <div className="loading-login" id="loadingLogin">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Tippy content="Cập nhật avatar">
        <CButton color="primary" size="sm" className="me-2" onClick={() => handleChooseAvatar()}>
          <BsFillCheckCircleFill />
        </CButton>
      </Tippy>
    </>
  );
};

export default UpdateAvatar;
