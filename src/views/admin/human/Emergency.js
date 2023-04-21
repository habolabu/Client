// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
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

import emergencyServices from 'src/api/humanServices/emergencyServices';
import EditEmergencyModal from 'src/components/adminComponents/human/emergency/EditEmergencyModal';
import DetailsEmergencyModal from 'src/components/adminComponents/human/emergency/DetailsEmergencyModal';
import DeleteEmergencyModal from 'src/components/adminComponents/human/emergency/DeleteEmergencyModal';

const Emergency = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [emergencyInfo, setEmergencyInfo] = useState([]);

  const getEmergencyUser = async () => {
    try {
      const params = {
        page: currentPage,
      };
      const res = await emergencyServices.getEmergencyUserID(params, userId);
      if (res && res.data) {
        setEmergencyInfo(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách khẩn cấp ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách khẩn cấp: ', error);
      toast.error('Thất bại khi lấy danh sách khẩn cấp ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getEmergencyUser();
  }, [currentPage]);

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <CCol md={7} xs={12}>
      <CCard className="mb-4">
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <strong>🏥 Danh sách liên hệ khẩn cấp</strong>
        </CCardHeader>
        <CCardBody>
          {emergencyInfo.totalPage > 0 ? (
            <CTable striped responsive hover className="text-center text-nowrap">
              <CTableHead>
                <CTableRow className="text-center">
                  <CTableHeaderCell scope="col">Mã liên hệ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Họ và tên</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {emergencyInfo.data.map((emergency) => {
                  return (
                    <CTableRow key={emergency.id} className="align-middle">
                      <CTableDataCell>{emergency.id}</CTableDataCell>
                      <CTableDataCell>{emergency.name}</CTableDataCell>
                      <CTableDataCell>{emergency.phoneNumber}</CTableDataCell>
                      <CTableDataCell>{emergency.address}</CTableDataCell>
                      <CTableDataCell>
                        {/* details avatar modal */}
                        <DetailsEmergencyModal emergencyId={emergency.id} />
                        {/* update avatar */}
                        <DeleteEmergencyModal
                          emergencyId={emergency.id}
                          submitDeleteEmergencyChange={getEmergencyUser}
                        />
                        {/* update avatar */}
                        <EditEmergencyModal emergencyId={emergency.id} submitEditEmergencyChange={getEmergencyUser} />
                      </CTableDataCell>
                    </CTableRow>
                  );
                })}
              </CTableBody>
            </CTable>
          ) : (
            <SkeletonTheme color="#202020" highlightColor="#ccc">
              <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
              <Skeleton count={5} />
            </SkeletonTheme>
          )}
        </CCardBody>
        <CCardFooter>
          {emergencyInfo.data ? (
            <CCol xs={12}>
              <div className={'mt-2'}>
                <ReactPaginate
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={'...'}
                  pageCount={emergencyInfo.totalPage}
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
          ) : (
            <p>Không tìm thấy thông tin...</p>
          )}
        </CCardFooter>
      </CCard>
    </CCol>
  );
};

export default Emergency;
