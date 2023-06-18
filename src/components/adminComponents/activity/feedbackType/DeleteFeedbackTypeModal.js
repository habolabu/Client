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
import feedBackTypeServices from 'src/api/activityServices/feedBackTypeServices';

const DeleteFeedbackTypeModal = ({ slug, submitDeleteFeedBackTypeChange }) => {
  const [visibleDeleteFeedBackType, setVisibleDeleteFeedBackType] = useState(false);
  const handleDeleteFeedBackType = async () => {
    try {
      const res = await feedBackTypeServices.deleteFeedBackType({ slug: slug });
      console.log(res);
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        submitDeleteFeedBackTypeChange();
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
        onClick={() => setVisibleDeleteFeedBackType(!visibleDeleteFeedBackType)}
      >
        Xoá
      </Button>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteFeedBackType}
        onClose={() => setVisibleDeleteFeedBackType(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá loại phản hồi</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteFeedBackType(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteFeedBackType(slug);
              setVisibleDeleteFeedBackType(false);
            }}
          >
            Xoá loại phản hồi
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteFeedbackTypeModal;
