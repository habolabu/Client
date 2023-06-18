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
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
} from '@coreui/react';

import Helmet from 'src/components/helmet/helmet';

import { toast } from 'react-toastify';

import { Pagination, Skeleton } from '@mui/material';

import feedBackServices from 'src/api/activityServices/feedBackServices';
import EditFeedbackModal from 'src/components/adminComponents/activity/feedback/EditFeedbackModal';
import DeleteFeedbackModal from 'src/components/adminComponents/activity/feedback/DeleteFeedbackModal';
import AddFeedbackModal from 'src/components/adminComponents/activity/feedback/AddFeedbackModal';
import { permissionLocal } from 'src/utils/permissionLocal';
import PermissionDirection from 'src/utils/PermissionDirection';

const Feedback = () => {
  const [feedBackList, setFeedBackList] = useState([]);
  const [searchName, setSearchName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getFeedBackAll = async () => {
    try {
      const params = {
        page: currentPage,
        title: searchName,
      };
      const res = await feedBackServices.getFeedBackAll(params);
      if (res && res.data) {
        setFeedBackList(res.data.response.body);
      } else {
        toast.error('Lấy danh sách phản hồi thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Lấy danh sách phản hồi thất bại: ', error);
      toast.error('Lấy danh sách phản hồi thất bại ! ', { theme: 'colored' });
    }
  };

  // get data page
  useEffect(() => {
    if (permissionLocal.isExistPermission(PermissionDirection.VIEW_FEEDBACK)) {
      const callApiFeedBack = setTimeout(() => {
        getFeedBackAll();
      }, 500);

      return () => {
        clearTimeout(callApiFeedBack);
      };
    }
  }, [currentPage, searchName]);

  const handlePageClick = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Helmet title="Danh sách phản hồi">
      <CContainer>
        {/* Action */}
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex align-items-center justify-content-between">
                {permissionLocal.isExistPermission(PermissionDirection.VIEW_FEEDBACK) ? (
                  <strong>Danh sách phản hồi</strong>
                ) : (
                  <strong>Gửi phản hồi</strong>
                )}
                {permissionLocal.isExistPermission(PermissionDirection.ADD_NEW_FEEDBACK) ? (
                  <AddFeedbackModal submitAddFeedBackChange={getFeedBackAll} />
                ) : null}
              </CCardHeader>
              {permissionLocal.isExistPermission(PermissionDirection.VIEW_FEEDBACK) ? (
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol md={6} sm={12}>
                      <CFormInput
                        type="text"
                        id="searchName"
                        floatingLabel="🔍 Tìm kiếm theo tên phản hồi"
                        placeholder="Nhập tên..."
                        onChange={(e) => {
                          setSearchName(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </CCol>
                  </CRow>
                  {/* Post list */}
                  {feedBackList.totalPage > 0 ? (
                    <CRow className="pt-3 px-4">
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tên phản hồi</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nội dung</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ngày tạo</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {feedBackList.data.map((feedBackItem) => {
                            return (
                              <CTableRow key={feedBackItem.id}>
                                <CTableHeaderCell scope="row">{feedBackItem.id}</CTableHeaderCell>
                                <CTableDataCell>{feedBackItem.title}</CTableDataCell>
                                <CTableDataCell>{feedBackItem.content}</CTableDataCell>
                                <CTableDataCell>{feedBackItem.createdAt.slice(0, 10)}</CTableDataCell>
                                <CTableDataCell>
                                  <EditFeedbackModal
                                    feedbackId={feedBackItem.id}
                                    slug={feedBackItem.slug}
                                    submitEditFeedBackChange={getFeedBackAll}
                                  />
                                  <DeleteFeedbackModal
                                    slug={feedBackItem.slug}
                                    submitDeleteFeedBackChange={getFeedBackAll}
                                  />
                                </CTableDataCell>
                              </CTableRow>
                            );
                          })}
                        </CTableBody>
                      </CTable>
                      {feedBackList.totalPage > 1 ? (
                        <CCol xs={12} className="d-flex justify-content-center mt-3">
                          <Pagination count={feedBackList.totalPage} color="primary" onChange={handlePageClick} />
                        </CCol>
                      ) : null}
                    </CRow>
                  ) : (
                    <CRow>
                      <p className="text-danger fw-bold">Không có thông tin !!!</p>
                      <CCol sm={12}>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                      </CCol>
                    </CRow>
                  )}
                </CCardBody>
              ) : null}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </Helmet>
  );
};

export default Feedback;
