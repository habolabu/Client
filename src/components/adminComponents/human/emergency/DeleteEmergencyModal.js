// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { toast } from 'react-toastify';
import emergencyServices from 'src/api/humanServices/emergencyServices';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const DeleteEmergencyModal = ({ emergencyId, submitDeleteEmergencyChange }) => {
  const [visibleDeleteEmergency, setVisibleDeleteEmergency] = useState(false);

  const handleDeleteEmergency = async () => {
    try {
      const res = await emergencyServices.deleteEmergency({ id: emergencyId });
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        submitDeleteEmergencyChange();
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
      <Tippy content="Xoá thông tin">
        <CButton
          color="danger"
          size="sm"
          className="me-2"
          onClick={() => setVisibleDeleteEmergency(!visibleDeleteEmergency)}
        >
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteEmergency}
        onClose={() => setVisibleDeleteEmergency(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá người liên hệ khẩn cấp</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteEmergency(false)}>
            Huỷ
          </CButton>
          <CButton
            color="info"
            onClick={() => {
              handleDeleteEmergency();
              setVisibleDeleteEmergency(false);
            }}
          >
            Xác nhận
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteEmergencyModal;
