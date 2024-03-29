// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormInput,
} from '@coreui/react';

import Helmet from 'src/components/helmet/helmet';

import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import areaServices from '../../../api/buildingServices/areaServices';

import AddArea from 'src/components/adminComponents/buiding/area/AddArea';
import EditArea from 'src/components/adminComponents/buiding/area/EditArea';
import DeleteArea from 'src/components/adminComponents/buiding/area/DeleteArea';
import { permissionLocal } from 'src/utils/permissionLocal';
import PermissionDirection from 'src/utils/PermissionDirection';
import Page403 from 'src/views/pages/auth/Page403';

const Building = () => {
  const [areaList, setAreaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);

  const getArea = async () => {
    try {
      const params = {
        page: currentPage,
        name: name,
        address: address,
      };
      const res = await areaServices.getArea(params);
      if (res && res.data) {
        setAreaList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách khu vực ! ' + res.response.message, {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách khu vực: ', error);
      toast.error('Thất bại khi lấy danh sách khu vực ! ' + error.message, { theme: 'colored' });
    }
  };

  // get data page
  useEffect(() => {
    if (permissionLocal.isExistPermission(PermissionDirection.VIEW_AREA)) {
      const callApiArea = setTimeout(() => {
        getArea();
      }, 500);

      return () => {
        clearTimeout(callApiArea);
      };
    }
  }, [currentPage, name, address]);

  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <Helmet title="Quản lý khu vực">
      {permissionLocal.isExistPermission(PermissionDirection.VIEW_AREA) ? (
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex align-items-center justify-content-between">
                <strong>🌎 Quản lý khu vực</strong>
                {/* add area modal */}
                {permissionLocal.isExistPermission(PermissionDirection.ADD_NEW_AREA) ? (
                  <AddArea submitAddAreaChange={getArea} />
                ) : null}
              </CCardHeader>
              <CCardBody>
                <CRow className="mb-3">
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="text"
                      floatingLabel="🔍 Tìm kiếm theo tên"
                      className="my-2"
                      id="searchName"
                      placeholder="Nhập tên..."
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CCol>
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="text"
                      floatingLabel="🔍 Tìm kiếm theo địa chỉ"
                      className="my-2"
                      id="searchAddress"
                      placeholder="Nhập địa chỉ..."
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </CCol>
                </CRow>
                {areaList.totalPage > 0 ? (
                  <>
                    <p className="text-medium-emphasis small">
                      <b>📃 Danh sách các khu vực</b>
                    </p>
                    <CAccordion alwaysOpen>
                      {areaList.data.map((areaItem) => {
                        return (
                          <CAccordionItem itemKey={areaItem.id} key={areaItem.id}>
                            <CAccordionHeader>
                              📌 {areaItem.name} - Địa chỉ: {areaItem.address}
                            </CAccordionHeader>
                            <CAccordionBody>
                              <div className="mb-3">
                                <b>⚡ Thao tác:</b>
                                {/* edit area modal */}
                                {permissionLocal.isExistPermission(PermissionDirection.MODIFY_EXIST_AREA) ? (
                                  <EditArea slug={areaItem.slug} submitEditAreaChange={getArea} />
                                ) : null}
                                {/* delete area modal */}
                                {permissionLocal.isExistPermission(PermissionDirection.DELETE_EXIST_AREA) ? (
                                  <DeleteArea slug={areaItem.slug} submitDeleteAreaChange={getArea} />
                                ) : null}
                              </div>

                              <div className="mb-3">
                                <h5>📃 Thông tin chi tiết</h5>
                                <ul>
                                  <li>
                                    <strong>Tên khu vực:</strong> {areaItem.name}
                                  </li>
                                  <li>
                                    <strong>Địa điểm:</strong> {areaItem.address}
                                  </li>
                                </ul>
                              </div>
                              <p>
                                <strong>📝 Danh sách các khu chung cư {areaItem.name.toLowerCase()}: </strong>
                                <Link to={areaItem.slug}>Xem tại đây !</Link>
                              </p>
                            </CAccordionBody>
                          </CAccordionItem>
                        );
                      })}
                    </CAccordion>
                  </>
                ) : (
                  <SkeletonTheme color="#202020" highlightColor="#ccc">
                    <p className="text-danger fw-bold">Không có thông tin !!!</p>
                    <Skeleton count={10} />
                  </SkeletonTheme>
                )}
              </CCardBody>
            </CCard>
          </CCol>
          {/* pagination */}
          {areaList.totalPage > 1 ? (
            <CCol xs={12}>
              <div className={'mt-2'}>
                <ReactPaginate
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={'...'}
                  pageCount={areaList.totalPage}
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

export default Building;
