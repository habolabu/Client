// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { toast } from 'react-toastify';
import userServices from 'src/api/humanServices/userServices';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const DeleteUserModal = ({ userId, submitDeleteUserChange }) => {
  const [visibleDeleteUser, setVisibleDeleteUser] = useState(false);

  const handleDeleteUser = async () => {
    try {
      const res = await userServices.deleteUser({ id: userId });
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        submitDeleteUserChange();
      } else {
        toast.error('Xoá thất bại ! ', { theme: 'colored' });
      }
    } catch (error) {
      console.log('Xoá thất bại: ', error);
      toast.error('Xoá thất bại ! ', { theme: 'colored' });
    }
  };

  return (
    <>
      <Tippy content="Xoá tài khoản">
        <CButton color="danger" size="sm" className="me-2" onClick={() => setVisibleDeleteUser(!visibleDeleteUser)}>
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteUser}
        onClose={() => setVisibleDeleteUser(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá tài khoản</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteUser(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteUser();
              setVisibleDeleteUser(false);
            }}
          >
            Xoá tài khoản
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteUserModal;
