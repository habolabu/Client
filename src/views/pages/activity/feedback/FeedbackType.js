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

import feedBackTypeServices from 'src/api/activityServices/feedBackTypeServices';
import AddFeedbackTypeModal from 'src/components/adminComponents/activity/feedbackType/AddFeedbackTypeModal';
import EditFeedbackTypeModal from 'src/components/adminComponents/activity/feedbackType/EditFeedbackTypeModal';
import DeleteFeedbackTypeModal from 'src/components/adminComponents/activity/feedbackType/DeleteFeedbackTypeModal';
import { permissionLocal } from 'src/utils/permissionLocal';
import PermissionDirection from 'src/utils/PermissionDirection';

const FeedbackType = () => {
  const [feedBackTypeList, setFeedBackTypeList] = useState([]);
  const [searchName, setSearchName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getFeedBackTypeAll = async () => {
    try {
      const params = {
        page: currentPage,
        name: searchName,
      };
      const res = await feedBackTypeServices.getFeedBackTypeAll(params);
      if (res && res.data) {
        setFeedBackTypeList(res.data.response.body);
      } else {
        toast.error('Lấy danh sách loại phản hồi thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Lấy danh sách loại phản hồi thất bại: ', error);
      toast.error('Lấy danh sách loại phản hồi thất bại ! ', { theme: 'colored' });
    }
  };

  // get data page
  useEffect(() => {
    const callApiFeedBackType = setTimeout(() => {
      getFeedBackTypeAll();
    }, 500);

    return () => {
      clearTimeout(callApiFeedBackType);
    };
  }, [currentPage, searchName]);

  const handlePageClick = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Helmet title="Loại phản hồi" role="Admin">
      <CContainer>
        {/* Action */}
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex align-items-center justify-content-between">
                <strong>Danh sách loại phản hồi</strong>
                {permissionLocal.isExistPermission(PermissionDirection.ADD_NEW_FEEDBACK_TYPE) ? (
                  <AddFeedbackTypeModal submitAddFeedBackTypeChange={getFeedBackTypeAll} />
                ) : null}
              </CCardHeader>
              <CCardBody>
                <CRow className="mb-3">
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="text"
                      id="searchName"
                      floatingLabel="🔍 Tìm kiếm theo tên loại phản hồi"
                      placeholder="Nhập tên..."
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                  </CCol>
                </CRow>
                {/* Post list */}
                {feedBackTypeList.totalPage > 0 ? (
                  <CRow className="pt-3 px-4">
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Tên phản hồi</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Ngày tạo</CTableHeaderCell>
                          {permissionLocal.isExistPermission(PermissionDirection.DELETE_EXIST_FEEDBACK_TYPE) ||
                          permissionLocal.isExistPermission(PermissionDirection.MODIFY_EXIST_FEEDBACK_TYPE) ? (
                            <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                          ) : null}
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {feedBackTypeList.data.map((feedBackTypeItem) => {
                          return (
                            <CTableRow key={feedBackTypeItem.id}>
                              <CTableHeaderCell scope="row">{feedBackTypeItem.id}</CTableHeaderCell>
                              <CTableDataCell>{feedBackTypeItem.name}</CTableDataCell>
                              <CTableDataCell>{feedBackTypeItem.createdAt.slice(0, 10)}</CTableDataCell>
                              {permissionLocal.isExistPermission(PermissionDirection.DELETE_EXIST_FEEDBACK_TYPE) ||
                              permissionLocal.isExistPermission(PermissionDirection.MODIFY_EXIST_FEEDBACK_TYPE) ? (
                                <CTableDataCell>
                                  {permissionLocal.isExistPermission(PermissionDirection.DELETE_EXIST_FEEDBACK_TYPE) ? (
                                    <EditFeedbackTypeModal
                                      slug={feedBackTypeItem.slug}
                                      submitEditFeedBackTypeChange={getFeedBackTypeAll}
                                    />
                                  ) : null}
                                  {permissionLocal.isExistPermission(PermissionDirection.DELETE_EXIST_FEEDBACK_TYPE) ? (
                                    <DeleteFeedbackTypeModal
                                      slug={feedBackTypeItem.slug}
                                      submitDeleteFeedBackTypeChange={getFeedBackTypeAll}
                                    />
                                  ) : null}
                                </CTableDataCell>
                              ) : null}
                            </CTableRow>
                          );
                        })}
                      </CTableBody>
                    </CTable>
                    <CCol xs={12} className="d-flex justify-content-center mt-3">
                      <Pagination count={feedBackTypeList.totalPage} color="primary" onChange={handlePageClick} />
                    </CCol>
                  </CRow>
                ) : (
                  <CRow>
                    <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
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
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </Helmet>
  );
};

export default FeedbackType;
