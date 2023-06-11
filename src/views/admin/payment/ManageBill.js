// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';

import { toast } from 'react-toastify';

import billServices from 'src/api/paymentServices/billServices';

import ApproveBill from 'src/components/adminComponents/payment/ApproveBill';
import DetailsPaymentModal from 'src/components/adminComponents/payment/DetailsPaymentModal';
import InitBill from 'src/components/adminComponents/payment/InitBill';
import RejectBill from 'src/components/adminComponents/payment/RejectBill';
import Helmet from 'src/components/helmet/helmet';
import numberWithCommas from 'src/utils/numberWithCommas';

const ManageBill = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [billInfo, setBillInfo] = useState([]);
  const [paymentTypeInfo, setPaymentTypeInfo] = useState(null);
  const [billStatus, setBillStatus] = useState(null);

  // search payment
  const [searchUserID, setSearchUserID] = useState('');
  const [billStatusID, setBillStatusID] = useState('2');
  const [paymentTypeID, setPaymentTypeID] = useState('');
  const [beginTotal, setBeginTotal] = useState('');
  const [endTotal, setEndTotal] = useState('');

  const getAllPaymentType = async () => {
    try {
      const res = await billServices.getAllPaymentTypes();
      if (res && res.data) {
        setPaymentTypeInfo(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách loại hoá đơn ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách loại hoá đơn: ', error);
      toast.error('Thất bại khi lấy danh sách loại hoá đơn ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getAllPaymentType();
  }, [currentPage]);

  const getAllStatusBill = async () => {
    try {
      const res = await billServices.getAllStatusBill();
      if (res && res.data) {
        setBillStatus(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách trạng thái hoá đơn ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách trạng thái hoá đơn: ', error);
      toast.error('Thất bại khi lấy danh sách trạng thái hoá đơn ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getAllStatusBill();
  }, []);

  const getAllBill = async () => {
    try {
      const params = {
        page: currentPage,
        userId: searchUserID,
        paymentTypeId: paymentTypeID,
        billStatusId: billStatusID,
        bTotal: beginTotal,
        eTotal: endTotal,
      };
      const res = await billServices.getAllBill(params);
      if (res && res.data) {
        setBillInfo(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách thanh toán ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách thanh toán: ', error);
      toast.error('Thất bại khi lấy danh sách thanh toán ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getAllBill();
  }, [currentPage, billStatusID, searchUserID, beginTotal, endTotal]);

  const handleChangePaymentType = (event) => {
    setPaymentTypeID(event.target.value);
  };

  const handleChangeBillStatus = (event) => {
    setBillStatusID(event.target.value);
  };

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <Helmet title="Quản lý hoá đơn" role="Admin">
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>💰 Danh sách hoá đơn</strong>
              <InitBill />
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={4} sm={12}>
                  <CFormLabel htmlFor="searchUserID" className="col-sm-12 col-form-label">
                    🔍 ID người dùng
                  </CFormLabel>
                  <CFormInput
                    type="number"
                    id="searchUserID"
                    placeholder="Nhập ID người dùng..."
                    onChange={(e) => setSearchUserID(e.target.value)}
                  />
                </CCol>
                <CCol md={4} sm={12}>
                  <CFormLabel htmlFor="searchPaymentType" className="col-sm-12 col-form-label">
                    🔍 Loại thanh toán
                  </CFormLabel>
                  {paymentTypeInfo ? (
                    <CFormSelect onChange={handleChangePaymentType}>
                      {paymentTypeInfo.map((payment) => (
                        <option key={payment.oid} value={payment.oid}>
                          {payment.name}
                        </option>
                      ))}
                    </CFormSelect>
                  ) : (
                    <></>
                  )}
                </CCol>

                <CCol md={4} sm={12}>
                  <CFormLabel htmlFor="searchBillStatus" className="col-sm-12 col-form-label">
                    🔍 Trạng thái hoá đơn
                  </CFormLabel>
                  {billStatus ? (
                    <CFormSelect value={billStatusID} onChange={handleChangeBillStatus}>
                      {billStatus.map((billStatus) => (
                        <option key={billStatus.id} value={billStatus.id}>
                          {billStatus.name}
                        </option>
                      ))}
                    </CFormSelect>
                  ) : (
                    <></>
                  )}
                </CCol>

                <CCol md={4} sm={12}>
                  <CFormLabel htmlFor="searchBeginTotal" className="col-sm-12 col-form-label">
                    🔍 Tìm kiếm theo tổng tiền (bắt đầu)
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="searchBeginTotal"
                    placeholder="Nhập số tiền..."
                    onChange={(e) => setBeginTotal(e.target.value)}
                  />
                </CCol>
                <CCol md={4} sm={12}>
                  <CFormLabel htmlFor="searchEndTotal" className="col-sm-12 col-form-label">
                    🔍 Tìm kiếm theo tổng tiền (kết thúc)
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="searchEndTotal"
                    placeholder="Nhập số tiền..."
                    onChange={(e) => setEndTotal(e.target.value)}
                  />
                </CCol>
              </CRow>

              {billStatus ? (
                <h5 className="my-4">💴 Danh sách hoá đơn (Trạng thái: {billStatus[billStatusID - 1].name})</h5>
              ) : null}

              {billInfo.totalPage > 0 ? (
                <CTable striped responsive hover className="text-center text-nowrap">
                  <CTableHead>
                    <CTableRow className="text-center">
                      <CTableHeaderCell scope="col">Mã hoá đơn</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Mã người dùng</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tên người thanh toán</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Trạng thái thanh toán</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Loại thanh toán</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tổng tiền</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {billInfo.data.map((bill) => {
                      return (
                        <CTableRow key={bill.id} className="align-middle">
                          <CTableDataCell>{bill.id}</CTableDataCell>
                          <CTableDataCell>{bill.user.id}</CTableDataCell>
                          <CTableDataCell>{`${bill.user.lastName} ${bill.user.firstName}`}</CTableDataCell>
                          <CTableDataCell>
                            {bill.billStatus.id === 2 ? (
                              <span className="text-warning">{bill.billStatus.name}</span>
                            ) : (
                              bill.billStatus.name
                            )}
                          </CTableDataCell>
                          <CTableDataCell>{bill.paymentType.name}</CTableDataCell>
                          <CTableDataCell>{numberWithCommas(bill.total)} vnđ</CTableDataCell>
                          <CTableDataCell>
                            <DetailsPaymentModal billId={bill.id} />
                            {bill.billStatus.id === 1 ? (
                              <>
                                <ApproveBill billId={bill.id} submitChange={getAllBill} />
                                <RejectBill billId={bill.id} submitChange={getAllBill} />
                              </>
                            ) : null}
                          </CTableDataCell>
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
              ) : (
                <SkeletonTheme color="#202020" highlightColor="#ccc">
                  <p className="text-danger fw-bold">Không tìm thấy dữ liệu dữ liệu. Vui lòng thử lại sau !!!</p>
                  <Skeleton count={5} />
                </SkeletonTheme>
              )}
            </CCardBody>
            <CCardFooter>
              {billInfo.totalPage > 1 ? (
                <CCol xs={12}>
                  <div className={'mt-2'}>
                    <ReactPaginate
                      previousLabel={'<<'}
                      nextLabel={'>>'}
                      breakLabel={'...'}
                      pageCount={billInfo.totalPage}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination justify-content-center'}
                      pageClassName={'page-item'}
                      pageLinkClassName={'page-link'}
                      previousClassName={'page-item'}
                      previousLinkClassName={'page-link'}
                      nextClassName={'page-item'}
                      nextLinkClassName={'page-link'}
                      breakClassName={'page-item'}
                      breakLinkClassName={'page-link'}
                      activeClassName={'active'}
                    />
                  </div>
                </CCol>
              ) : null}
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </Helmet>
  );
};

export default ManageBill;
