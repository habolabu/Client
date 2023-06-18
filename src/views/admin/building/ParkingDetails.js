// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

import parkingServices from 'src/api/buildingServices/parkingServices';
import parkingSpaceServices from '../../../api/buildingServices/parkingSpaceServices';

import Helmet from 'src/components/helmet/helmet';

import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import AddParkingSpaceModal from 'src/components/adminComponents/buiding/parkingSpace/AddParkingSpaceModal';
import EditParkingSpaceModal from 'src/components/adminComponents/buiding/parkingSpace/EditParkingSpaceModal';
import DeleteParkingSpaceModal from 'src/components/adminComponents/buiding/parkingSpace/DeleteParkingSpaceModal';
import Page403 from 'src/views/pages/auth/Page403';
import PermissionDirection from 'src/utils/PermissionDirection';
import { permissionLocal } from 'src/utils/permissionLocal';

const ParkingDetails = () => {
  const url = useParams();
  const [parkingInfo, setParkingInfo] = useState([]);
  const [parkingSpaceList, setParkingSpaceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // searching
  const [beginCapacity, setBeginCapacity] = useState('');
  const [endCapacity, setEndCapacity] = useState('');
  const [beginAvailableSpace, setBeginAvailableSpace] = useState('');
  const [endAvailableSpace, setEndAvailableSpace] = useState('');

  useEffect(() => {
    const getParkingDetails = async () => {
      try {
        const res = await parkingServices.getParkingDetails(url.parkingDetails);
        if (res && res.data) {
          setParkingInfo(res.data.response.body);
        } else {
          toast.error('Thất bại khi lấy thông tin chi tiết bãi đỗ xe ! ', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thất bại khi lấy thông tin chi tiết bãi đỗ xe: ', error);
        toast.error('Thất bại khi lấy thông tin chi tiết bãi đỗ xe ! ', { theme: 'colored' });
      }
    };
    getParkingDetails();
  }, [url.parkingDetails]);

  // get data page
  const getParkingSpaces = async () => {
    try {
      const params = {
        page: currentPage,
        parkingId: parkingInfo.id,
        bCapacity: beginCapacity,
        eCapacity: endCapacity,
        bAvailableSpace: beginAvailableSpace,
        eAvailableSpace: endAvailableSpace,
      };
      const res = await parkingSpaceServices.getParkingSpace(params);
      if (res && res.data) {
        console.log('Danh sách khu vực đỗ xe: ', res.data.response.body);
        setParkingSpaceList(res.data.response.body);
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
    const callApiParkingSpaces = setTimeout(() => {
      getParkingSpaces();
    }, 500);

    return () => {
      clearTimeout(callApiParkingSpaces);
    };
  }, [currentPage, beginCapacity, endCapacity, beginAvailableSpace, endAvailableSpace, parkingInfo]);

  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <Helmet title="Bãi đỗ xe tầng hầm">
      {permissionLocal.isExistPermission(PermissionDirection.VIEW_PARKING_DETAIL) ? (
        <CRow className="align-items-center justify-content-center">
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex align-items-center justify-content-between">
                <strong>🚕 Bãi đỗ xe {parkingInfo.name}</strong>
                {/* add parking space modal */}
                <AddParkingSpaceModal parkingId={parkingInfo.id} submitAddParkingSpaceChange={getParkingSpaces} />
              </CCardHeader>
              <CCardBody>
                <CRow className="mb-3 justify-content-center">
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="text"
                      floatingLabel="🔍 Sức chứa (bắt đầu)"
                      className="my-2"
                      id="searchBCapacity"
                      placeholder="Nhập số bắt đầu..."
                      onChange={(e) => setBeginCapacity(e.target.value)}
                    />
                  </CCol>
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="text"
                      floatingLabel="🔍 Sức chứa (kết thúc)"
                      className="my-2"
                      id="searchECapacity"
                      placeholder="Nhập số kết thúc..."
                      onChange={(e) => setEndCapacity(e.target.value)}
                    />
                  </CCol>
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="text"
                      floatingLabel="🔍 Sức chứa còn lại (bắt đầu)"
                      className="my-2"
                      id="searchBAvailableSpace"
                      placeholder="Nhập số bắt đầu..."
                      onChange={(e) => setBeginAvailableSpace(e.target.value)}
                    />
                  </CCol>
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="text"
                      floatingLabel="🔍 Sức chứa còn lại (kết thúc)"
                      className="my-2"
                      id="searchEAvailableSpace"
                      placeholder="Nhập số kết thúc..."
                      onChange={(e) => setEndAvailableSpace(e.target.value)}
                    />
                  </CCol>
                </CRow>
                {parkingSpaceList.totalPage > 0 ? (
                  <>
                    <h6 className="my-4">📃 Danh sách bãi đỗ xe</h6>
                    <CTable striped responsive hover className="text-center text-nowrap">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Mã khu vực đỗ xe (ID)</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Tên khu vực đỗ xe</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Sức chứa</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Còn trống</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {parkingSpaceList.data.map((parkingSpace) => {
                          return (
                            <CTableRow key={parkingSpace.parkingTypeId}>
                              <CTableHeaderCell scope="row">{parkingSpace.parkingTypeId}</CTableHeaderCell>
                              <CTableDataCell>{parkingSpace.parkingType.name}</CTableDataCell>
                              <CTableDataCell>{parkingSpace.capacity} chỗ</CTableDataCell>
                              <CTableDataCell>{parkingSpace.availableSpace} chỗ</CTableDataCell>
                              <CTableDataCell>
                                {/* edit parking space modal */}
                                <EditParkingSpaceModal
                                  parkingId={parkingInfo.id}
                                  parkingTypeId={parkingSpace.parkingTypeId}
                                  capacity={parkingSpace.capacity}
                                  availableSpace={parkingSpace.availableSpace}
                                  submitEditParkingSpaceChange={getParkingSpaces}
                                />
                                {/* delete parking space modal */}
                                <DeleteParkingSpaceModal
                                  parkingId={parkingInfo.id}
                                  parkingTypeId={parkingSpace.parkingTypeId}
                                  submitDeleteParkingSpaceChange={getParkingSpaces}
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
          {parkingSpaceList.totalPage > 1 ? (
            <CCol xs={12}>
              <div className={'mt-2'}>
                <ReactPaginate
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={'...'}
                  pageCount={parkingSpaceList.totalPage}
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

export default ParkingDetails;
