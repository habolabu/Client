// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import parkingSpaceServices from 'src/api/buildingServices/parkingSpaceServices';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const DeleteParkingSpaceModal = ({ parkingId, parkingTypeId, submitDeleteParkingSpaceChange }) => {
  const [visibleDeleteParkingSpace, setVisibleDeleteParkingSpace] = useState(false);

  const handleDeleteParkingSpace = async () => {
    try {
      const params = {
        referenceKey: {
          parkingId: parkingId,
          parkingTypeId: parkingTypeId,
        },
      };
      const res = await parkingSpaceServices.deleteParkingSpace(params);
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        submitDeleteParkingSpaceChange();
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
          onClick={() => setVisibleDeleteParkingSpace(!visibleDeleteParkingSpace)}
        >
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteParkingSpace}
        onClose={() => setVisibleDeleteParkingSpace(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá khu vực đỗ xe</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteParkingSpace(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteParkingSpace();
              setVisibleDeleteParkingSpace(false);
            }}
          >
            Xoá khu vực đỗ xe
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteParkingSpaceModal;
