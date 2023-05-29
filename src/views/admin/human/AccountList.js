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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CFormLabel,
  CButton,
} from '@coreui/react';

import { toast } from 'react-toastify';

import userServices from 'src/api/humanServices/userServices';

import Helmet from 'src/components/helmet/helmet';

import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import AddUserModal from 'src/components/adminComponents/human/user/AddUserModal';
import EditUserModal from 'src/components/adminComponents/human/user/EditUserModal';
import DeleteUserModal from 'src/components/adminComponents/human/user/DeleteUserModal';
import { BiSearchAlt } from 'react-icons/bi';
import Tippy from '@tippyjs/react';

const AccountList = () => {
  const [userList, setUserList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // searching
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [searchBeginDOP, setSearchBeginDOP] = useState('');
  const [searchEndDOP, setSearchEndDOP] = useState('');

  // get data page
  const getUsers = async () => {
    try {
      const params = {
        page: currentPage,
        firstName: searchFirstName,
        lastName: searchLastName,
        address: searchAddress,
        bDateOfBirth: searchBeginDOP,
        eDateOfBirth: searchEndDOP,
      };
      const res = await userServices.getUsers(params);
      if (res && res.data) {
        console.log(res.data);
        setUserList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách tài khoản ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log('Vui lòng nhập đúng định dạng ngày sinh (yyyy-mm-dd): ', error);
        toast.error('Vui lòng nhập đúng định dạng ngày sinh (yyyy-mm-dd) ! ', {
          theme: 'colored',
        });
      } else
        toast.error('Tìm kiếm thất bại ! ', {
          theme: 'colored',
        });
    }
  };

  useEffect(() => {
    const callApiGetUser = setTimeout(() => {
      getUsers();
    }, 500);
    return () => {
      clearTimeout(callApiGetUser);
    };
  }, [currentPage, searchFirstName, searchLastName, searchAddress, searchBeginDOP, searchEndDOP]);

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <Helmet title="Quản lý tài khoản" role="Admin">
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>🕵️‍♀️ Quản lý tài khoản</strong>
              {/* add user modal */}
              <AddUserModal submitAddUserChange={getUsers} />
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={3} sm={12}>
                  <CFormLabel htmlFor="searchFirstName" className="col-sm-12 col-form-label">
                    🔍 Tìm kiếm theo tên
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="searchFirstName"
                    placeholder="Nhập tên..."
                    onChange={(e) => setSearchFirstName(e.target.value)}
                  />
                </CCol>
                <CCol md={4} sm={12}>
                  <CFormLabel htmlFor="searchLastName" className="col-sm-12 col-form-label">
                    🔍 Tìm kiếm theo họ tên lót
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="searchLastName"
                    placeholder="Nhập họ tên lót..."
                    onChange={(e) => setSearchLastName(e.target.value)}
                  />
                </CCol>
                <CCol md={5} sm={12}>
                  <CFormLabel htmlFor="searchAddress" className="col-sm-12 col-form-label">
                    🔍 Tìm kiếm địa chỉ
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="searchAddress"
                    placeholder="Nhập địa chỉ..."
                    onChange={(e) => setSearchAddress(e.target.value)}
                  />
                </CCol>
                <CCol md={6} sm={12}>
                  <CFormLabel htmlFor="searchBeginDOP" className="col-sm-12 col-form-label">
                    🔍 Tìm kiếm theo ngày sinh (bắt đầu)
                  </CFormLabel>
                  <CFormInput
                    type="date"
                    id="searchBeginDOP"
                    placeholder="Nhập ngày bắt đầu (vd: 2001-01-01)..."
                    onChange={(e) => setSearchBeginDOP(e.target.value)}
                  />
                </CCol>
                <CCol md={6} sm={12}>
                  <CFormLabel htmlFor="searchEndDOP" className="col-sm-12 col-form-label">
                    🔍 Tìm kiếm theo ngày sinh (kết thúc)
                  </CFormLabel>
                  <CFormInput
                    type="date"
                    id="searchEndDOP"
                    placeholder="Nhập ngày kết thúc (vd: 2001-01-05)..."
                    onChange={(e) => setSearchEndDOP(e.target.value)}
                  />
                </CCol>
              </CRow>
              {userList ? (
                <CTable striped responsive hover className="text-nowrap text-center">
                  <CTableHead>
                    <CTableRow className="text-center">
                      <CTableHeaderCell scope="col">Mã người dùng</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Họ và tên</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Giới tính</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Ngày sinh</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Vai trò</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {userList.data.map((user) => {
                      return (
                        <CTableRow key={user.id}>
                          <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                          <CTableDataCell>{`${user.lastName}  ${user.firstName}`}</CTableDataCell>
                          <CTableDataCell>{user.gender === 0 ? 'Nữ' : 'Nam'}</CTableDataCell>
                          <CTableHeaderCell scope="row">{user.address}</CTableHeaderCell>
                          <CTableHeaderCell scope="row">{user.dateOfBirth.slice(0, 10)}</CTableHeaderCell>
                          <CTableHeaderCell scope="row">
                            {user.roles.map((role) => {
                              return <span key={role.roleId}>{role.roleName}</span>;
                            })}
                            ;
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="row">
                            {/* details user modal */}
                            <Link to={`${user.id}`}>
                              <Tippy content="Xem chi tiết">
                                <CButton size="sm" color="info">
                                  <BiSearchAlt />
                                </CButton>
                              </Tippy>
                            </Link>
                            {/* edit user modal */}
                            <EditUserModal userId={user.id} submitEditUserChange={getUsers} />
                            {/* delete user modal */}
                            <DeleteUserModal userId={user.id} submitDeleteUserChange={getUsers} />
                          </CTableHeaderCell>
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
          </CCard>
        </CCol>
        {/* pagination */}
        {userList ? (
          <CCol xs={12}>
            <div className={'mt-2'}>
              <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={userList.totalPage}
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
        ) : (
          <></>
        )}
      </CRow>
    </Helmet>
  );
};

export default AccountList;
