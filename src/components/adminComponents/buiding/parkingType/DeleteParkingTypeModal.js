// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import parkingTypeServices from 'src/api/buildingServices/parkingTypeServices';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const DeleteParkingTypeModal = ({ slug, submitDeleteParkingTypeChange }) => {
  const [visibleDeleteParkingType, setVisibleDeleteParkingType] = useState(false);

  const handleDeleteParkingType = async (slug) => {
    try {
      const res = await parkingTypeServices.deleteParkingType({ slug: slug });
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        setVisibleDeleteParkingType(false);
        submitDeleteParkingTypeChange();
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
      <Tippy content="Xoá khu vực đỗ xe">
        <CButton
          color="danger"
          size="sm"
          className="me-2"
          onClick={() => setVisibleDeleteParkingType(!visibleDeleteParkingType)}
        >
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteParkingType}
        onClose={() => setVisibleDeleteParkingType(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá khu vực đỗ xe</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteParkingType(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteParkingType(slug);
              setVisibleDeleteParkingType(false);
            }}
          >
            Xoá khu vực đỗ xe
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteParkingTypeModal;
