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
import ownerHistoryServices from 'src/api/buildingServices/ownerHistoryServices';

const DeleteUserRoomModal = ({ idRecord, submitDeleteUserRoomChange }) => {
  const [visibleDeleteRoom, setVisibleDeleteUserRoom] = useState(false);
  const handleDeleteRoom = async () => {
    try {
      const res = await ownerHistoryServices.unAssignUserToRoom({ id: idRecord });
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        submitDeleteUserRoomChange();
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
      <Tippy content="Xoá chủ phòng">
        <CButton
          color="secondary"
          size="sm"
          className="ms-2"
          onClick={() => setVisibleDeleteUserRoom(!visibleDeleteRoom)}
        >
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteRoom}
        onClose={() => setVisibleDeleteUserRoom(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá chủ phòng</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteUserRoom(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteRoom();
              setVisibleDeleteUserRoom(false);
            }}
          >
            Xoá
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteUserRoomModal;
