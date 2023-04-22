/* eslint-disable react-hooks/exhaustive-deps */
// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { useState } from 'react';
import authServices from 'src/api/auth/authServices';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Helmet from 'src/components/helmet/helmet';

export default function SearchRole() {
  const [permissionList, setPermissionList] = useState([]);
  const [accountId, setAccountId] = useState(0);

  const getPermissions = async () => {
    try {
      const res = await authServices.getPermissionAccount(accountId);
      if (res && res.data) {
        setPermissionList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách quyền ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách quyền: ', error);
      toast.error('Thất bại khi lấy danh sách quyền ! ', { theme: 'colored' });
    }
  };

  useEffect(() => {
    const callApiPermission = setTimeout(() => {
      getPermissions();
    }, 500);

    return () => {
      clearTimeout(callApiPermission);
    };
  }, [accountId]);

  return (
    <Helmet title="Tìm kiếm quyền">
      <CRow className="align-items-center justify-content-center">
        <CCol md={10} xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>🏫 Tìm kiếm phân quyền người dùng</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={6} sm={12}>
                  <CFormLabel htmlFor="searchAccountId" className="col-sm-12 col-form-label">
                    🔍 Tìm kiếm theo mã tài khoản
                  </CFormLabel>
                  <CFormInput
                    type="number"
                    id="searchAccountId"
                    placeholder="Nhập mã tài khoản..."
                    onChange={(e) => {
                      e.target.value !== '' ? setAccountId(e.target.value) : setAccountId(0);
                    }}
                  />
                </CCol>
              </CRow>

              {permissionList.length > 0 ? (
                <>
                  <h6 className="my-4">📃 Danh sách phân quyền tài khoản: accountId = {accountId}</h6>
                  <CTable striped responsive hover className="text-center text-nowrap">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Số thứ tự (ID)</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Tên quyền</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {permissionList.map((permission) => {
                        return (
                          <CTableRow key={permission.id}>
                            <CTableHeaderCell scope="row">{permission.id}</CTableHeaderCell>
                            <CTableDataCell>{permission.display}</CTableDataCell>
                            <CTableDataCell>
                              <CFormCheck checked={permission.status} readOnly />
                            </CTableDataCell>
                          </CTableRow>
                        );
                      })}
                    </CTableBody>
                  </CTable>
                </>
              ) : (
                <></>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </Helmet>
  );
}
