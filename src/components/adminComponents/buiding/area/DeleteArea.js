/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import areaServices from 'src/api/buildingServices/areaServices';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const DeleteArea = ({ slug, submitDeleteAreaChange }) => {
  const [visibleDeleteArea, setVisibleDeleteArea] = useState(false);

  const handleDeleteArea = async () => {
    try {
      const params = {
        slug: slug,
      };

      const res = await areaServices.deleteArea(params);
      if (res.response.message === 'Successful') {
        toast.success('Xoá thành công !', { theme: 'colored' });
        submitDeleteAreaChange();
      } else {
        toast.error('Xoá thất bại ! Không được xoá khi tồn tại danh sách chung cư trong khu đất ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Xoá thất bại: ', error.response.data.error.body.message);
      toast.error('Xoá thất bại ! Không được xoá khi tồn tại danh sách chung cư trong khu đất : ', {
        theme: 'colored',
      });
    }
  };

  return (
    <>
      <Tippy content="Xoá khu vực">
        <CButton color="danger" size="sm" className="ms-2" onClick={() => setVisibleDeleteArea(!visibleDeleteArea)}>
          <MdDeleteForever />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteArea}
        onClose={() => setVisibleDeleteArea(false)}
      >
        <CModalHeader>
          <CModalTitle>Bạn có muốn xoá ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ❗ Mọi hành động của bạn sẽ không được phục hồi nếu bạn ấn nút
          <b className="text-danger"> Xoá khu vực</b>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteArea(false)}>
            Huỷ
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDeleteArea(slug);
              setVisibleDeleteArea(false);
            }}
          >
            Xoá khu vực
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteArea;
