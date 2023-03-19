/* eslint-disable react/prop-types */
import React from 'react';
import { CButton } from '@coreui/react';
import { toast } from 'react-toastify';
import billServices from 'src/api/paymentServices/billServices';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';

const RejectBill = ({ billId }) => {
  const handleRejectBill = async () => {
    try {
      const res = await billServices.rejectBill(billId);
      if (res.response.message === 'Successful') {
        toast.success('Từ chối hoá đơn thành công ! ', {
          theme: 'colored',
        });
      } else {
        toast.error('Từ chối hoá đơn thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Từ chối hoá đơn thất bại: ', error);
      toast.error('Từ chối hoá đơn thất bại ! ', { theme: 'colored' });
    }
  };

  return (
    <>
      <Tippy content="Từ chối hoá đơn">
        <CButton color="danger" size="sm" className="ms-2" onClick={() => handleRejectBill()}>
          <MdDeleteForever />
        </CButton>
      </Tippy>
    </>
  );
};

export default RejectBill;
