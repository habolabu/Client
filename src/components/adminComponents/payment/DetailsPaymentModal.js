// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react';
import { BsEyeFill } from 'react-icons/bs';

import { toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import billServices from 'src/api/paymentServices/billServices';
import numberWithCommas from 'src/utils/numberWithCommas';
import Tippy from '@tippyjs/react';

const DetailsPaymentModal = ({ billId }) => {
  const [visibleDetailsPayment, setVisibleDetailsPayment] = useState(false);
  const [bill, setBill] = useState(null);

  const getBillDetails = async () => {
    try {
      const res = await billServices.getBillDetails(billId);
      if (res && res.data) {
        setBill(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy chi tiết hoá đơn ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy chi tiết hoá đơn: ', error);
      toast.error('Thất bại khi lấy chi tiết hoá đơn ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getBillDetails();
  }, [billId]);

  return (
    <>
      <Tippy content="Xem chi tiết hoá đơn">
        <CButton
          size="sm"
          color="info"
          onClick={() => {
            setVisibleDetailsPayment(!visibleDetailsPayment);
            getBillDetails();
          }}
        >
          <BsEyeFill />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDetailsPayment}
        onClose={() => setVisibleDetailsPayment(false)}
      >
        <CModalHeader>
          <CModalTitle>Thông tin chi tiết hoá đơn</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {bill ? (
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="billId" className="col-sm-12 col-form-label">
                  <b>
                    Mã hoá đơn <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput type="text" id="billId" name="billId" value={bill.id} disabled />
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="billUserId" className="col-sm-12 col-form-label">
                  <b>
                    Mã người dùng <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput type="text" id="billUserId" name="billUserId" value={bill.user.id} disabled />
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                  <b>
                    Tên người thanh toán <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  value={`${bill.user.lastName} ${bill.user.firstName}`}
                  disabled
                />
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="paymentType" className="col-sm-12 col-form-label">
                  <b>
                    Loại thanh toán <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput type="text" id="paymentType" name="paymentType" value={bill.paymentType.name} disabled />
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="createdAt" className="col-sm-12 col-form-label">
                  <b>
                    Ngày tạo <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="createdAt"
                  name="createdAt"
                  value={bill.createdAt ? bill.createdAt.slice(0, 10) : 'Chưa cập nhật'}
                  disabled
                />
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="paidDate" className="col-sm-12 col-form-label">
                  <b>
                    Ngày thanh toán <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="paidDate"
                  name="paidDate"
                  value={bill.paidDate ? bill.paidDate.slice(0, 10) : 'Chưa cập nhật'}
                  disabled
                />
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="billStatusId" className="col-sm-12 col-form-label">
                  <b>
                    Trạng thái thanh toán <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput type="text" id="billStatusId" name="billStatusId" value={bill.billStatus.name} disabled />
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="total" className="col-sm-12 col-form-label">
                  <b>
                    Tổng tiền thanh toán <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="total"
                  name="total"
                  value={numberWithCommas(bill.total) + ' vnđ'}
                  disabled
                />
              </CCol>
            </CRow>
          ) : (
            <SkeletonTheme color="#202020" highlightColor="#ccc">
              <p className="text-danger fw-bold">Không tìm thấy thông tin...</p>
              <Skeleton count={5} />
            </SkeletonTheme>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDetailsPayment(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DetailsPaymentModal;
