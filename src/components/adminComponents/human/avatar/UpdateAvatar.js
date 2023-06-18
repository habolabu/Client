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

const UpdateAvatar = ({ avatarId }) => {
  const handleChooseAvatar = async () => {
    try {
      const res = await avatarServices.updateAvatar({ id: avatarId });
      if (res.hasOwnProperty('error')) {
        toast.error('Chọn ảnh thất bại. Vui lòng thử lại sau ! ', {
          theme: 'colored',
        });
      } else if (res && res.data) {
        toast.success('Chọn ảnh thành công ! ', {
          theme: 'colored',
        });
      } else {
        toast.error('Chọn ảnh thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Chọn ảnh thất bại: ', error);
      toast.error('Chọn ảnh thất bại ! ', { theme: 'colored' });
    }
  };

  return (
    <>
      <Tippy content="Cập nhật avatar">
        <CButton color="primary" size="sm" className="me-2" onClick={() => handleChooseAvatar()}>
          <BsFillCheckCircleFill />
        </CButton>
      </Tippy>
    </>
  );
};

export default UpdateAvatar;
