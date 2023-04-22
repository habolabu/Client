// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import parkingServices from 'src/api/buildingServices/parkingServices';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const DeleteParkingModal = ({ slug, submitDeleteParkingChange }) => {
  const [visibleDeleteParking, setVisibleDeleteParking] = useState(false);

  const handleDeleteParking = async () => {
    try {
      const res = await parkingServices.deleteParking({ slug: slug });
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        submitDeleteParkingChange();
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
      <Tippy content="Xoá bãi đỗ xe">
        <CButton
          color="danger"
          size="sm"
          className="ms-2"
          onClick={() => setVisibleDeleteParking(!visibleDeleteParking)}
        >
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteParking}
        onClose={() => setVisibleDeleteParking(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá bãi đỗ xe</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteParking(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteParking(slug);
              setVisibleDeleteParking(false);
            }}
          >
            Xoá bãi đỗ xe
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteParkingModal;
