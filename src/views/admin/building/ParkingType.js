// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CFormLabel,
} from '@coreui/react';

import { toast } from 'react-toastify';

import parkingTypeServices from '../../../api/buildingServices/parkingTypeServices';

import Helmet from 'src/components/helmet/helmet';

import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import AddParkingTypeModal from 'src/components/adminComponents/buiding/parkingType/AddParkingTypeModal';
import EditParkingTypeModal from 'src/components/adminComponents/buiding/parkingType/EditParkingTypeModal';
import DetailsParkingTypeModal from 'src/components/adminComponents/buiding/parkingType/DetailsParkingTypeModal';
import DeleteParkingTypeModal from 'src/components/adminComponents/buiding/parkingType/DeleteParkingTypeModal';
import { permissionLocal } from 'src/utils/permissionLocal';
import PermissionDirection from 'src/utils/PermissionDirection';
import Page403 from 'src/views/pages/auth/Page403';

const ParkingType = () => {
  const [parkingTypeList, setParkingTypeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [nameParkingType, setNameParkingType] = useState('');

  const getParkingType = async () => {
    try {
      const params = {
        page: currentPage,
        name: nameParkingType,
      };
      const res = await parkingTypeServices.getParkingType(params);
      if (res && res.data) {
        console.log(res.data);
        setParkingTypeList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách khu vực đỗ xe ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách khu vực đỗ xe: ', error);
      toast.error('Thất bại khi lấy danh sách khu vực đỗ xe ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    const callApiParkingType = setTimeout(() => {
      getParkingType();
    }, 500);

    return () => {
      clearTimeout(callApiParkingType);
    };
  }, [currentPage, nameParkingType]);

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <Helmet title="Quản lý đỗ xe">
      {permissionLocal.isExistPermission(PermissionDirection.VIEW_PARKING_TYPE) ? (
        <CRow className="align-items-center justify-content-center">
          <CCol md={8} xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex align-items-center justify-content-between">
                <strong>🚕 Quản lý khu vực đỗ xe</strong>
                {/* add parking type modal */}
                <AddParkingTypeModal submitAddParkingTypeChange={getParkingType} />
              </CCardHeader>
              <CCardBody>
                <CRow className="mb-3">
                  <CCol md={7} sm={12}>
                    <CFormInput
                      type="text"
                      id="searchNameParkingType"
                      floatingLabel=" 🔍 Tìm kiếm theo tên khu vực đỗ xe"
                      placeholder="Nhập tên bãi đỗ xe..."
                      onChange={(e) => setNameParkingType(e.target.value)}
                    />
                  </CCol>
                </CRow>
                {parkingTypeList.totalPage ? (
                  <>
                    <h6 className="my-4">📃 Danh sách khu vực đỗ xe</h6>
                    <CTable striped responsive hover className="text-center text-nowrap">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Mã khu vực đỗ xe (ID)</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Loại khu vực đỗ xe</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {parkingTypeList.data.map((parkingType) => {
                          return (
                            <CTableRow key={parkingType.id}>
                              <CTableHeaderCell scope="row">{parkingType.id}</CTableHeaderCell>
                              <CTableDataCell>{parkingType.name}</CTableDataCell>
                              <CTableDataCell>
                                {/* details parking type modal */}
                                <DetailsParkingTypeModal slug={parkingType.slug} />
                                {/* edit parking type modal */}
                                <EditParkingTypeModal
                                  slug={parkingType.slug}
                                  submitEditParkingTypeChange={getParkingType}
                                />
                                {/* delete parking type modal */}
                                <DeleteParkingTypeModal
                                  slug={parkingType.slug}
                                  submitDeleteParkingTypeChange={getParkingType}
                                />
                              </CTableDataCell>
                            </CTableRow>
                          );
                        })}
                      </CTableBody>
                    </CTable>
                  </>
                ) : (
                  <SkeletonTheme color="#202020" highlightColor="#ccc">
                    <p className="text-danger fw-bold">Không có thông tin !!!</p>
                    <Skeleton count={3} />
                  </SkeletonTheme>
                )}
              </CCardBody>
            </CCard>
          </CCol>
          {/* pagination */}
          {parkingTypeList.totalPage > 1 ? (
            <CCol xs={12}>
              <div className={'mt-2'}>
                <ReactPaginate
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={'...'}
                  pageCount={parkingTypeList.totalPage}
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
        </CRow>
      ) : (
        <Page403 />
      )}
    </Helmet>
  );
};

export default ParkingType;
