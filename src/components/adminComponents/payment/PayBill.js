/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { CButton } from '@coreui/react';
import { toast } from 'react-toastify';
import billServices from 'src/api/paymentServices/billServices';
import { MdPayment } from 'react-icons/md';
import Tippy from '@tippyjs/react';
import { useParams } from 'react-router-dom';

const PayBill = ({ billId }) => {
  const url = useParams();

  const handlePayBill = async () => {
    try {
      const data = {
        billId: billId,
        returnUrl: 'http://localhost:3000/quan-tri-vien/hoa-don',
      };
      const res = await billServices.payBill(data);
      console.log(res);
      if (res.response.message === 'Successful') {
        toast.success('Đang chuyển đến trang thanh toán ! ', {
          theme: 'colored',
        });
        window.location.href = res.response.body.payUrl;
      } else {
        toast.error('Thanh toán hoá đơn thất bại. Vui lòng thử lại sau ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thanh toán hoá đơn thất bại. ', error);
      toast.error('Thanh toán hoá đơn thất bại. Vui lòng thử lại sau ! ', { theme: 'colored' });
    }
  };

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    const resultCode = params.get('resultCode');

    if (resultCode != null) {
      if (parseInt(resultCode) === 1004) {
        toast.error('Đặt hàng thất bại do số tiền thanh toán vượt quá hạn mức thanh toán của bạn', {
          theme: 'colored',
        });
      } else if (parseInt(resultCode) === 1005) {
        toast.error('Đặt hàng thất bại do url hoặc QR code đã hết hạn', { theme: 'colored' });
      } else if (parseInt(resultCode) === 1006) {
        toast.error('Đặt hàng thất bại do bạn đã huỷ giao dịch', { theme: 'colored' });
      } else if (parseInt(resultCode) !== 0) {
        toast.error('Đặt hàng thất bại do lỗi hệ thống', { theme: 'colored' });
      } else if (parseInt(resultCode) === 0) {
        toast.success('Thanh toán thành công !', { theme: 'colored' });
        const res = billServices.getBillPayComplete(billId);
        console.log(res);
      } else {
        toast.error('Thanh toán thất bại', { theme: 'colored' });
      }
    }
  }, [url, billId]);

  return (
    <>
      <Tippy content="Thanh toán hoá đơn">
        <CButton color="success" size="sm" className="ms-2" onClick={() => handlePayBill()}>
          <MdPayment />
        </CButton>
      </Tippy>
    </>
  );
};

export default PayBill;
