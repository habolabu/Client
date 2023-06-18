// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import { Button } from '@mui/material';
import feedBackServices from 'src/api/activityServices/feedBackServices';

const DeleteFeedbackModal = ({ slug, submitDeleteFeedBackChange }) => {
  const [visibleDeleteFeedBack, setVisibleDeleteFeedBack] = useState(false);

  const handleDeleteFeedBack = async () => {
    try {
      const res = await feedBackServices.deleteFeedBack({ slug: slug });
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        submitDeleteFeedBackChange();
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
      <Button
        variant="contained"
        color="error"
        endIcon={<MdDeleteForever />}
        size="small"
        className="me-2"
        onClick={() => setVisibleDeleteFeedBack(!visibleDeleteFeedBack)}
      >
        Xoá
      </Button>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteFeedBack}
        onClose={() => setVisibleDeleteFeedBack(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá phản hồi</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteFeedBack(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteFeedBack(slug);
              setVisibleDeleteFeedBack(false);
            }}
          >
            Xoá phản hồi
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteFeedbackModal;
