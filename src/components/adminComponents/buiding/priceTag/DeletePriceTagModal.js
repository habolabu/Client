// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import priceTagServices from 'src/api/buildingServices/priceTagServices';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const DeletePriceTagModal = ({ slug, submitDeletePriceTagChange }) => {
  const [visibleDeletePriceTag, setVisibleDeletePriceTag] = useState(false);

  const handleDeletePriceTag = async (slug) => {
    try {
      const res = await priceTagServices.deletePriceTag({ slug: slug });
      if (res && res.data) {
        toast.success('Xoá thành công !', { theme: 'colored' });
        setVisibleDeletePriceTag(false);
        submitDeletePriceTagChange();
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
      <Tippy content="Xoá thẻ giá">
        <CButton
          color="danger"
          size="sm"
          className="me-2"
          onClick={() => setVisibleDeletePriceTag(!visibleDeletePriceTag)}
        >
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeletePriceTag}
        onClose={() => setVisibleDeletePriceTag(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá thẻ giá</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeletePriceTag(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeletePriceTag(slug);
              setVisibleDeletePriceTag(false);
            }}
          >
            Xoá thẻ giá
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeletePriceTagModal;
