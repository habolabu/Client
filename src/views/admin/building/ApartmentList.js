// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
} from '@coreui/react';
import { BiSearchAlt } from 'react-icons/bi';

import { toast } from 'react-toastify';

import Helmet from 'src/components/helmet/helmet';

import AddApartment from 'src/components/adminComponents/buiding/apartment/AddApartment';
import EditApartment from 'src/components/adminComponents/buiding/apartment/EditApartment';
import DeleteApartment from 'src/components/adminComponents/buiding/apartment/DeleteApartment';

import areaServices from '../../../api/buildingServices/areaServices';
import apartmentServices from 'src/api/buildingServices/apartmentServices';

import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Tippy from '@tippyjs/react';
import { permissionLocal } from 'src/utils/permissionLocal';
import PermissionDirection from 'src/utils/PermissionDirection';
import Page403 from 'src/views/pages/auth/Page403';

const ApartmentList = () => {
  const url = useParams();
  const [areaInfo, setAreaInfo] = useState([]);
  const [apartmentList, setApartmentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // search apartment (name, beginFloor, endFloor)
  const [apartmentName, setApartmentName] = useState('');
  const [beginFloorAmount, setBeginFloorAmount] = useState('');
  const [endFloorAmount, setEndFloorAmount] = useState('');

  // get area details
  useEffect(() => {
    const getAreaDetails = async () => {
      try {
        const res = await areaServices.getAreaDetails(url.areaDetails);
        if (res && res.data) {
          setAreaInfo(res.data.response.body);
        } else {
          toast.error('Thất bại khi lấy thông tin chi tiết khu đất ! ', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thất bại khi lấy thông tin chi tiết khu đất: ', error);
        toast.error('Thất bại khi lấy thông tin chi tiết khu đất ! ', { theme: 'colored' });
      }
    };
    getAreaDetails();
  }, [url.areaDetails]);

  // get apartment list
  const getApartments = async () => {
    try {
      const params = {
        areaId: areaInfo.id,
        page: currentPage,
        name: apartmentName,
        bFloorAmount: beginFloorAmount,
        eFloorAmount: endFloorAmount,
      };
      const res = await apartmentServices.getApartments(params);
      if (res && res.data) {
        setApartmentList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách chung cư ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách chung cư: ', error);
      toast.error('Thất bại khi lấy danh sách chung cư ! ', { theme: 'colored' });
    }
  };

  useEffect(() => {
    if (permissionLocal.isExistPermission(PermissionDirection.VIEW_APARTMENT)) {
      const callApiApartment = setTimeout(() => {
        getApartments();
      }, 500);

      return () => {
        clearTimeout(callApiApartment);
      };
    }
  }, [currentPage, apartmentName, beginFloorAmount, endFloorAmount, areaInfo]);

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <Helmet title="Danh sách chung cư">
      {permissionLocal.isExistPermission(PermissionDirection.VIEW_APARTMENT) ? (
        <CRow className="align-items-center justify-content-center">
          <CCol md={10} xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex align-items-center justify-content-between">
                <strong>🏫 Danh sách chung cư ở {areaInfo.name}</strong>
                {/* add apartment modal */}
                {permissionLocal.isExistPermission(PermissionDirection.ADD_NEW_APARTMENT) ? (
                  <AddApartment areaId={areaInfo.id} submitAddApartmentChange={getApartments} />
                ) : null}
              </CCardHeader>
              <CCardBody>
                <CRow className="mb-3">
                  <CCol md={12} sm={12}>
                    <CFormInput
                      type="text"
                      floatingLabel="🔍 Tìm kiếm theo tên chung cư"
                      className="my-2"
                      id="searchApartmentName"
                      placeholder="Nhập tên chung cư..."
                      onChange={(e) => setApartmentName(e.target.value)}
                    />
                  </CCol>
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="number"
                      floatingLabel="🔍 Số lượng phòng (bắt đầu)"
                      className="my-2"
                      id="searchBeginFloorAmount"
                      placeholder="Nhập số bắt đầu..."
                      onChange={(e) => setBeginFloorAmount(e.target.value)}
                    />
                  </CCol>
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="number"
                      floatingLabel="🔍 Số lượng phòng (kết thúc)"
                      className="my-2"
                      id="searchEndFloorAmount"
                      placeholder="Nhập số kết thúc..."
                      onChange={(e) => setEndFloorAmount(e.target.value)}
                    />
                  </CCol>
                </CRow>

                {apartmentList.totalPage > 0 ? (
                  <>
                    <h6 className="my-4">📃 Danh sách khu chung cư</h6>
                    <CTable striped responsive hover className="text-center text-nowrap">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Mã chung cư (ID)</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Tên chung cư</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Số lượng phòng</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {apartmentList.data.map((apartment) => {
                          return (
                            <CTableRow key={apartment.id}>
                              <CTableHeaderCell scope="row">{apartment.id}</CTableHeaderCell>
                              <CTableDataCell>{apartment.name}</CTableDataCell>
                              <CTableDataCell>{apartment.floorAmount}</CTableDataCell>
                              <CTableDataCell>
                                <Link to={apartment.slug}>
                                  <Tippy content="Xem chi tiết">
                                    <CButton size="sm" color="info" className="me-2">
                                      <BiSearchAlt />
                                    </CButton>
                                  </Tippy>
                                </Link>
                                {/* edit apartment modal */}
                                {permissionLocal.isExistPermission(PermissionDirection.MODIFY_EXIST_APARTMENT) ? (
                                  <EditApartment
                                    areaId={areaInfo.id}
                                    slug={apartment.slug}
                                    submitEditApartmentChange={getApartments}
                                  />
                                ) : null}
                                {/* delete apartment modal */}
                                {permissionLocal.isExistPermission(PermissionDirection.DELETE_EXIST_APARTMENT) ? (
                                  <DeleteApartment slug={apartment.slug} submitDeleteApartmentChange={getApartments} />
                                ) : null}
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
          {apartmentList.totalPage > 1 ? (
            <CCol xs={12}>
              <div className={'mt-2'}>
                <ReactPaginate
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={'...'}
                  pageCount={apartmentList.totalPage}
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

export default ApartmentList;
