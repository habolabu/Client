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
  CImage,
} from '@coreui/react';

import Helmet from 'src/components/helmet/helmet';

import { toast } from 'react-toastify';

import { Pagination, Skeleton } from '@mui/material';

import emotionServices from 'src/api/activityServices/emotionServices';
import EditEmotionModal from 'src/components/adminComponents/activity/emotion/EditEmotionModal';
import DeleteEmotionModal from 'src/components/adminComponents/activity/emotion/DeleteEmotionModal';
import AddEmotionModal from 'src/components/adminComponents/activity/emotion/AddEmotionModal';

const ManageEmotion = () => {
  const [emotionList, setEmotionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getEmotionAll = async () => {
    try {
      const params = {
        page: currentPage,
      };
      const res = await emotionServices.getEmotionAll(params);
      if (res && res.data) {
        setEmotionList(res.data.response.body);
      } else {
        toast.error('Lấy danh sách cảm xúc thất bại ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Lấy danh sách cảm xúc thất bại: ', error);
      toast.error('Lấy danh sách cảm xúc thất bại ! ', { theme: 'colored' });
    }
  };

  // get data page
  useEffect(() => {
    const callApiEmotion = setTimeout(() => {
      getEmotionAll();
    }, 500);

    return () => {
      clearTimeout(callApiEmotion);
    };
  }, [currentPage]);

  const handlePageClick = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Helmet title="Quản lý cảm xúc" role="Admin">
      <CContainer>
        {/* Action */}
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex align-items-center justify-content-between">
                <strong>Quản lý cảm xúc</strong>
                <AddEmotionModal />
              </CCardHeader>
              <CCardBody>
                {/* Post list */}
                {emotionList.totalPage > 0 ? (
                  <CRow className="pt-3 px-4">
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Tên hành động</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Hình ảnh</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {emotionList.data.map((emotionItem) => {
                          return (
                            <CTableRow key={emotionItem.id}>
                              <CTableHeaderCell scope="row">{emotionItem.id}</CTableHeaderCell>
                              <CTableDataCell>{emotionItem.name}</CTableDataCell>
                              <CTableDataCell>
                                <CImage rounded src={emotionItem.icon} width={40} height={40} />
                              </CTableDataCell>
                              <CTableDataCell>
                                <EditEmotionModal />
                                <DeleteEmotionModal />
                              </CTableDataCell>
                            </CTableRow>
                          );
                        })}
                      </CTableBody>
                    </CTable>
                    {emotionList.totalPage > 1 ? (
                      <CCol xs={12} className="d-flex justify-content-center mt-3">
                        <Pagination count={emotionList.totalPage} color="primary" onChange={handlePageClick} />
                      </CCol>
                    ) : null}
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

export default ManageEmotion;
