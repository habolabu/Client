/* eslint-disable react/prop-types */
import React from 'react';
import { CButton } from '@coreui/react';
import { toast } from 'react-toastify';
import avatarServices from 'src/api/humanServices/avatarServices';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const DeleteAvatar = ({ avatarId, submitDeleteAvatarChange }) => {
  const handleDeleteAvatar = async () => {
    try {
      const res = await avatarServices.deleteAvatar({ id: avatarId });
      if (res.hasOwnProperty('error')) {
        toast.error('Xoá thất bại. Vui lòng thử lại sau ! ', {
          theme: 'colored',
        });
      } else if (res.response.message === 'Successful') {
        toast.success('Xoá thành công ! ', {
          theme: 'colored',
        });
        submitDeleteAvatarChange();
      } else {
        toast.error('Xoá thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Xoá thất bại: ', error);
      toast.error('Xoá thất bại ! ', { theme: 'colored' });
    }
  };

  return (
    <>
      <Tippy content="Xoá ảnh">
        <CButton color="danger" size="sm" className="ms-2" onClick={() => handleDeleteAvatar()}>
          <MdDeleteForever />
        </CButton>
      </Tippy>
    </>
  );
};

export default DeleteAvatar;
