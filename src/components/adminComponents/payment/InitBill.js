// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React from 'react';
import { CButton } from '@coreui/react';
import { toast } from 'react-toastify';
import { BiPlusMedical } from 'react-icons/bi';
import billServices from 'src/api/paymentServices/billServices';

const InitBill = () => {
  const handleInitBill = async () => {
    try {
      const res = await billServices.initBill();
      if (res && res.data) {
        toast.success('Khởi tạo thành công ! ', {
          theme: 'colored',
        });
      } else {
        toast.error('Khởi tạo thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Khởi tạo thất bại: ', error);
      toast.error('Khởi tạo thất bại ! ' + error.message, { theme: 'colored' });
    }
  };

  return (
    <>
      <CButton color="success" size="sm" onClick={() => handleInitBill()}>
        Khởi tạo <BiPlusMedical />
      </CButton>
    </>
  );
};

export default InitBill;
