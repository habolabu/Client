// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';
import authServices from 'src/api/auth/authServices';

const DeleteRoleModal = ({ roleId, submitDeleteRoleChange }) => {
  const [visibleDeleteRole, setVisibleDeleteRole] = useState(false);

  const handleDeleteRole = async (roleId) => {
    try {
      const res = await authServices.deleteRole({ id: roleId });
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        setVisibleDeleteRole(false);
        submitDeleteRoleChange();
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
      <Tippy content="Xoá vai trò">
        <CButton color="danger" size="sm" className="ms-2" onClick={() => setVisibleDeleteRole(!visibleDeleteRole)}>
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteRole}
        onClose={() => setVisibleDeleteRole(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá vai trò</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteRole(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteRole(roleId);
              setVisibleDeleteRole(false);
            }}
          >
            Xoá vai trò
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteRoleModal;
