// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

import billServices from 'src/api/paymentServices/billServices';

import Helmet from 'src/components/helmet/helmet';
import numberWithCommas from 'src/utils/numberWithCommas';
import PayBill from 'src/components/adminComponents/payment/PayBill';
import DetailsPaymentModal from 'src/components/adminComponents/payment/DetailsPaymentModal';
import { Box } from '@mui/material';

const Bill = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [billInfo, setBillInfo] = useState([]);

  const getBillCurrentUser = async () => {
    try {
      const params = {
        page: currentPage,
      };
      const res = await billServices.getBillCurrentUser(params);
      if (res && res.data) {
        setBillInfo(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy thông tin hoá đơn ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy thông tin hoá đơn: ', error);
      toast.error('Thất bại khi lấy thông tin hoá đơn ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getBillCurrentUser();
  }, [currentPage]);

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <Helmet title="Hoá đơn">
      <CRow>
        <CCol xs={12}>
          <Box className="box-title">
            <strong>Hoá đơn của tôi</strong>
          </Box>
          <CRow className="mb-3">
            {billInfo.data ? (
              <CTable striped responsive hover className="text-center text-nowrap table-custom">
                <CTableHead>
                  <CTableRow className="text-center">
                    <CTableHeaderCell scope="col">Mã hoá đơn</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày tạo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày thanh toán</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tổng tiền</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {billInfo.data.map((bill) => {
                    return (
                      <CTableRow key={bill.id} className="align-middle">
                        <CTableDataCell>{bill.id}</CTableDataCell>
                        <CTableDataCell>{`${bill.user.lastName} ${bill.user.firstName}`}</CTableDataCell>
                        <CTableDataCell>{bill.billStatus.name}</CTableDataCell>
                        <CTableDataCell>
                          {bill.createdAt ? bill.createdAt.slice(0, 10) : 'Chưa tạo hoá đơn'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {bill.paidDate ? bill.paidDate.slice(0, 10) : 'Không có thông tin'}
                        </CTableDataCell>
                        <CTableDataCell>{numberWithCommas(bill.total)} vnđ</CTableDataCell>
                        <CTableDataCell>
                          <DetailsPaymentModal billId={bill.id} />
                          {bill.billStatus.id === 2 ? <PayBill billId={bill.id} /> : null}
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
            ) : (
              <SkeletonTheme color="#202020" highlightColor="#ccc">
                <p className="text-danger fw-bold">Không tìm thấy dữ liệu dữ liệu. Vui lòng thử lại sau !!!</p>
                <Skeleton count={3} />
              </SkeletonTheme>
            )}
          </CRow>
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
        </CCol>
      </CRow>
    </Helmet>
  );
};

export default Bill;
