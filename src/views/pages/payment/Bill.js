/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
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

import Helmet from 'src/components/helmet/helmet';
import numberWithCommas from 'src/utils/numberWithCommas';
import PayBill from 'src/components/adminComponents/payment/PayBill';
import DetailsPaymentModal from 'src/components/adminComponents/payment/DetailsPaymentModal';

const Bill = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [billInfo, setBillInfo] = useState(null);

  const getBillCurrentUser = async () => {
    try {
      const params = {
        page: currentPage,
      };
      const res = await billServices.getBillCurrentUser(params);
      if (res.response.message === 'Successful') {
        setBillInfo(res.response.body);
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
    <Helmet title="Hoá đơn" role="Admin">
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>💰 Danh sách hoá đơn của bạn</strong>
            </CCardHeader>
            <CCardBody>
              {billInfo != null ? (
                <CTable striped responsive hover className="text-center text-nowrap">
                  <CTableHead>
                    <CTableRow className="text-center">
                      <CTableHeaderCell scope="col">Mã hoá đơn</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tên người thanh toán</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Trạng thái thanh toán</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Ngày tạo</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Ngày thanh toán</CTableHeaderCell>
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
                          <CTableDataCell>{`${bill.user.lastName} ${bill.user.firstName}`}</CTableDataCell>
                          <CTableDataCell>{bill.billStatus.name}</CTableDataCell>
                          <CTableDataCell>
                            {bill.createdAt ? bill.createdAt.slice(0, 10) : 'Chưa tạo hoá đơn'}
                          </CTableDataCell>
                          <CTableDataCell>
                            {bill.paidDate ? bill.paidDate.slice(0, 10) : 'Không có thông tin'}
                          </CTableDataCell>
                          <CTableDataCell>{bill.paymentType.name}</CTableDataCell>
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
                  <Skeleton count={5} />
                </SkeletonTheme>
              )}
            </CCardBody>
            <CCardFooter>
              {billInfo ? (
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

export default Bill;
