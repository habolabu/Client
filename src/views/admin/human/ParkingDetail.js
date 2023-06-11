// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFooter,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

import parkingDetailServices from 'src/api/humanServices/parkingDetailServices';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ParkingDetail = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // search parking
  const [parkingList, setParkingList] = useState([]);

  // get parking page
  const getParkingList = async () => {
    try {
      const params = {
        page: currentPage,
        userId: userId,
      };
      const res = await parkingDetailServices.getParking(params);
      console.log(res);
      if (res && res.data) {
        setParkingList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách bãi đỗ xe ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách bãi đỗ xe: ', error);
      toast.error('Thất bại khi lấy danh sách bãi đỗ xe ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    const callApiParking = setTimeout(() => {
      getParkingList();
    }, 500);

    return () => {
      clearTimeout(callApiParking);
    };
  }, [currentPage, userId]);

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <CCol md={6} xs={12}>
      <h5 className="mb-3">📝 Thông tin danh sách bãi đỗ xe</h5>
      <CCard className="mb-4">
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <strong>📃 Danh sách bãi đỗ xe</strong>
          {/* add parking modal */}
          {/* <AddParkingModal apartmentId={apartmentId} submitAddParkingChange={getParkingList} /> */}
        </CCardHeader>
        <CCardBody>
          {/* <CRow className="mb-3">
            <CCol sm={12}>
              <CFormLabel htmlFor="searchNameParking" className="col-form-label">
                🔍 Tìm kiếm theo tên bãi đỗ xe:
              </CFormLabel>
            </CCol>
            <CCol sm={12}>
              <CFormInput
                type="text"
                id="searchNameParking"
                placeholder="Nhập tên bãi đỗ xe..."
                onChange={(e) => setNameParking(e.target.value)}
              />
            </CCol>
          </CRow> */}
          {parkingList.totalPage > 0 ? (
            <CTable striped responsive hover className="text-center text-nowrap">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Mã bãi đỗ xe</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mã khu vực đỗ xe</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {parkingList.data.map((parking) => {
                  return (
                    <CTableRow key={parking.parkingId}>
                      <CTableHeaderCell scope="row">{parking.parkingId}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{parking.parkingTypeId}</CTableHeaderCell>
                      <CTableDataCell>
                        {/* edit parking modal */}
                        {/* <EditParkingModal
                          apartmentId={apartmentId}
                          parkingId={parking.id}
                          parkingName={parking.name}
                          submitEditParkingChange={getParkingList}
                        /> */}
                        {/* delete parking modal */}
                        {/* <DeleteParkingModal slug={parking.slug} submitDeleteParkingChange={getParkingList} /> */}
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
        <CFooter>
          {/* pagination */}
          {parkingList.totalPage > 1 ? (
            <CCol xs={12}>
              <div className={'mt-2'}>
                <ReactPaginate
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={'...'}
                  pageCount={parkingList.totalPage}
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
        </CFooter>
      </CCard>
    </CCol>
  );
};

export default ParkingDetail;
