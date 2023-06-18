// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import postServices from 'src/api/activityServices/postServices';
import { IconButton } from '@mui/material';

const DeletePostModal = ({ slug, submitDeletePostChange }) => {
  const [visibleDeletePost, setVisibleDeletePost] = useState(false);
  const handleDeletePost = async () => {
    try {
      const res = await postServices.deletePost({ slug: slug });
      if (res && res.data) {
        submitDeletePostChange();
        toast.success('Xoá thành công !', { theme: 'colored' });
      } else {
        toast.error('Xoá thất bại ! ', { theme: 'colored' });
      }
    } catch (error) {
      console.log('Xoá thất bại: ', error.message);
      toast.error('Xoá thất bại ! ', { theme: 'colored' });
    }
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={() => setVisibleDeletePost(!visibleDeletePost)}>
        <MdDeleteForever />
      </IconButton>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeletePost}
        onClose={() => setVisibleDeletePost(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá bài viết</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeletePost(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeletePost(slug);
              setVisibleDeletePost(false);
            }}
          >
            Xoá bài viết
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeletePostModal;
