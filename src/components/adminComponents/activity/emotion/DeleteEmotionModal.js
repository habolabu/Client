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
import emotionServices from 'src/api/activityServices/emotionServices';

const DeleteEmotionModal = ({ emotionId, submitEmotionChange }) => {
  const [visibleDeleteEmotion, setVisibleDeleteEmotion] = useState(false);

  const handleDeleteEmotion = async () => {
    try {
      const res = await emotionServices.deleteEmotion({ emotionId: emotionId });
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        submitEmotionChange();
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
      <Tippy content="Xoá cảm xúc">
        <CButton
          color="danger"
          size="sm"
          className="me-2"
          onClick={() => setVisibleDeleteEmotion(!visibleDeleteEmotion)}
        >
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteEmotion}
        onClose={() => setVisibleDeleteEmotion(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá cảm xúc</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteEmotion(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteEmotion();
              setVisibleDeleteEmotion(false);
            }}
          >
            Xoá cảm xúc
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteEmotionModal;
