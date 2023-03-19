/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import apartmentServices from 'src/api/buildingServices/apartmentServices';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const DeleteApartment = ({ slug, submitDeleteApartmentChange }) => {
  const [visibleDeleteApartment, setVisibleDeleteApartment] = useState(false);

  const handleDeleteApartment = async () => {
    try {
      const res = await apartmentServices.deleteApartment({ slug: slug });
      if (res.response.message === 'Successful') {
        submitDeleteApartmentChange();
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
      <Tippy content="Xoá chung cư">
        <CButton
          color="danger"
          size="sm"
          className="ms-2"
          onClick={() => setVisibleDeleteApartment(!visibleDeleteApartment)}
        >
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteApartment}
        onClose={() => setVisibleDeleteApartment(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá chung cư</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteApartment(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteApartment(slug);
              setVisibleDeleteApartment(false);
            }}
          >
            Xoá chung cư
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteApartment;
