/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import roomServices from 'src/api/buildingServices/roomServices';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const DeleteRoomModal = ({ slug, submitDeleteRoomChange }) => {
  const [visibleDeleteRoom, setVisibleDeleteRoom] = useState(false);

  const handleDeleteRoom = async () => {
    try {
      const res = await roomServices.deleteRoom({ slug: slug });
      if (res.response.message === 'Successful') {
        toast.success('Xoá thành công !', { theme: 'colored' });
        submitDeleteRoomChange();
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
      <Tippy content="Xoá phòng">
        <CButton color="danger" size="sm" className="ms-2" onClick={() => setVisibleDeleteRoom(!visibleDeleteRoom)}>
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteRoom}
        onClose={() => setVisibleDeleteRoom(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá phòng</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteRoom(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteRoom(slug);
              setVisibleDeleteRoom(false);
            }}
          >
            Xoá phòng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteRoomModal;
