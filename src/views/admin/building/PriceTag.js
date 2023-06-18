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

import priceTagServices from '../../../api/buildingServices/priceTagServices';

import Helmet from 'src/components/helmet/helmet';
import numberWithCommas from 'src/utils/numberWithCommas';

import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import AddPriceTagModal from 'src/components/adminComponents/buiding/priceTag/AddPriceTagModal';
import EditPriceTagModal from 'src/components/adminComponents/buiding/priceTag/EditPriceTagModal';
import DetailsPriceTagModal from 'src/components/adminComponents/buiding/priceTag/DetailsPriceTagModal';
import DeletePriceTagModal from 'src/components/adminComponents/buiding/priceTag/DeletePriceTagModal';

const PriceTag = () => {
  const [priceTagList, setPriceTagList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // searching
  const [namePriceTag, setNamePriceTag] = useState('');
  const [beginPricePerDay, setBeginPricePerDay] = useState('');
  const [endPricePerDay, setEndPricePerDay] = useState('');

  // get data page
  const getPriceTags = async () => {
    try {
      const params = {
        page: currentPage,
        name: namePriceTag,
        bPricePerDay: beginPricePerDay,
        ePricePerDay: endPricePerDay,
      };
      const res = await priceTagServices.getPriceTag(params);
      if (res && res.data) {
        setPriceTagList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách giá cả ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách giá cả: ', error);
      toast.error('Thất bại khi lấy danh sách giá cả ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    const callApiPriceTag = setTimeout(() => {
      getPriceTags();
    }, 500);
    return () => {
      clearTimeout(callApiPriceTag);
    };
  }, [currentPage, namePriceTag, beginPricePerDay, endPricePerDay]);

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };
  return (
    <Helmet title="Quản lý giá cả">
      <CRow className="align-items-center justify-content-center">
        <CCol md={8} xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>💰 Quản lý giá cả</strong>
              {/* add price tag modal */}
              <AddPriceTagModal submitAddPriceTagChange={getPriceTags} />
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={6} sm={12}>
                  <CFormInput
                    type="text"
                    floatingLabel="🔍 Tìm kiếm theo tên"
                    id="searchName"
                    placeholder="Nhập tên..."
                    onChange={(e) => setNamePriceTag(e.target.value)}
                  />
                </CCol>
                <CCol md={3} sm={12}>
                  <CFormInput
                    type="text"
                    floatingLabel="🔍 Giá (bắt đầu)"
                    id="searchBeginPricePerDay"
                    placeholder="Nhập giá bắt đầu..."
                    onChange={(e) => setBeginPricePerDay(e.target.value)}
                  />
                </CCol>
                <CCol md={3} sm={12}>
                  <CFormInput
                    type="text"
                    floatingLabel=" 🔍 Giá (kết thúc)"
                    id="searchEndPricePerDay"
                    placeholder="Nhập giá kết thúc..."
                    onChange={(e) => setEndPricePerDay(e.target.value)}
                  />
                </CCol>
              </CRow>
              {priceTagList.data ? (
                <CTable striped responsive hover className="text-center text-nowrap">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Mã thẻ giá (ID)</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tên giá</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Giá</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {priceTagList.data.map((priceTag) => {
                      return (
                        <CTableRow key={priceTag.id}>
                          <CTableHeaderCell scope="row">{priceTag.id}</CTableHeaderCell>
                          <CTableDataCell>{priceTag.name}</CTableDataCell>
                          <CTableDataCell>
                            {priceTag.pricePerDay != null
                              ? numberWithCommas(priceTag.pricePerDay) + ' vnđ'
                              : 'Chưa cập nhật'}
                          </CTableDataCell>
                          <CTableDataCell>
                            {/* details price tag modal */}
                            <DetailsPriceTagModal slug={priceTag.slug} />
                            {/* edit price tag modal */}
                            <EditPriceTagModal
                              slug={priceTag.slug}
                              priceTagId={priceTag.id}
                              submitEditPriceTagChange={getPriceTags}
                            />
                            {/* delete price tag modal */}
                            <DeletePriceTagModal slug={priceTag.slug} submitDeletePriceTagChange={getPriceTags} />
                          </CTableDataCell>
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
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
        {priceTagList.totalPage > 1 ? (
          <CCol xs={12}>
            <div className={'mt-2'}>
              <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={priceTagList.totalPage}
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
    </Helmet>
  );
};

export default PriceTag;
