// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React from 'react';
import { CButton } from '@coreui/react';
import { toast } from 'react-toastify';
import billServices from 'src/api/paymentServices/billServices';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Tippy from '@tippyjs/react';

const ApproveBill = ({ billId, submitChange }) => {
  const handleApproveBill = async () => {
    try {
      const res = await billServices.approveBill(billId);
      if (res && res.data) {
        toast.success('Duyệt hoá đơn thành công ! ', {
          theme: 'colored',
        });
        submitChange();
      } else {
        toast.error('Duyệt hoá đơn thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Duyệt hoá đơn thất bại: ', error);
      toast.error('Duyệt hoá đơn thất bại ! ', { theme: 'colored' });
    }
  };

  return (
    <>
      <Tippy content="Duyệt hoá đơn">
        <CButton color="primary" size="sm" className="me-2" onClick={() => handleApproveBill()}>
          <BsFillCheckCircleFill />
        </CButton>
      </Tippy>
    </>
  );
};

export default ApproveBill;
