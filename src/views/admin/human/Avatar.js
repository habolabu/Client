// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CImage,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

import avatarServices from 'src/api/humanServices/avatarServices';

import DeleteAvatar from 'src/components/adminComponents/human/avatar/DeleteAvatar';
import DetailsAvatarModal from 'src/components/adminComponents/human/avatar/DetailsAvatarModal';
import UpdateAvatar from 'src/components/adminComponents/human/avatar/UpdateAvatar';

const Avatar = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [avatarUser, setAvatarUser] = useState([]);

  const getAvatarUser = async () => {
    try {
      const params = {
        page: currentPage,
      };
      const res = await avatarServices.getAvatarUserID(params, userId);
      if (res && res.data) {
        setAvatarUser(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy avatar tài khoản ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy avatar tài khoản: ', error);
      toast.error('Thất bại khi lấy avatar tài khoản ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getAvatarUser();
  }, [currentPage]);

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <CCol md={5} xs={12}>
      <CCard className="mb-4">
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <strong>📃 Danh sách ảnh đại diện</strong>
        </CCardHeader>
        <CCardBody>
          {avatarUser.totalPage > 0 ? (
            <CTable striped responsive hover className="text-center text-nowrap">
              <CTableHead>
                <CTableRow className="text-center">
                  <CTableHeaderCell scope="col">Mã hình ảnh</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ngày tạo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Hình ảnh</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {avatarUser.data.map((avatar) => {
                  return (
                    <CTableRow key={avatar.id} className="align-middle">
                      <CTableDataCell>{avatar.id}</CTableDataCell>
                      <CTableDataCell>{avatar.createdAt.slice(0, 10)}</CTableDataCell>
                      <CTableDataCell>
                        <CImage align="center" src={avatar.url} width={100} height={100} />
                      </CTableDataCell>
                      <CTableDataCell>
                        {/* details avatar modal */}
                        <DetailsAvatarModal avatarId={avatar.id} />
                        {/* update avatar */}
                        <DeleteAvatar avatarId={avatar.id} submitDeleteAvatarChange={getAvatarUser} />
                        {/* update avatar */}
                        <UpdateAvatar avatarId={avatar.id} />
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
        <CCardFooter>
          {avatarUser.totalPage > 1 ? (
            <CCol xs={12}>
              <div className={'mt-2'}>
                <ReactPaginate
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={'...'}
                  pageCount={avatarUser.totalPage}
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
        </CCardFooter>
      </CCard>
    </CCol>
  );
};

export default Avatar;
