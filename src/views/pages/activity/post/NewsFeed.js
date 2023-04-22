// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CCard, CCardBody, CCardHeader, CCol, CRow, CFormInput, CFormLabel, CButton } from '@coreui/react';

import Helmet from 'src/components/helmet/helmet';

import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Tippy from '@tippyjs/react';
import { BiPlusMedical } from 'react-icons/bi';

const NewsFeed = () => {
  return (
    <Helmet title="Tin tức" role="Admin">
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>🌎 Tin tức</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={6} sm={12}>
                  Danh sách bài viết ở đây
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        {/* pagination */}
        {/* {areaList.totalPage > 0 ? (
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
        ) : null} */}
      </CRow>
    </Helmet>
  );
};

export default NewsFeed;
