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
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { useState } from 'react';
import authServices from 'src/api/auth/authServices';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Helmet from 'src/components/helmet/helmet';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import AddRoleModal from 'src/components/adminComponents/role/AddRoleModal';
import DeleteRoleModal from 'src/components/adminComponents/role/DeleteRoleModal';
import UpdateRoleModal from 'src/components/adminComponents/role/UpdateRoleModal';

export default function RoleManagement() {
  const [roleList, setRoleList] = useState([]);

  const getRoles = async () => {
    try {
      const res = await authServices.getAllRole();
      if (res && res.data) {
        setRoleList(res.data.response.body);
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
    getRoles();
  }, []);

  return (
    <Helmet title="Danh sách vai trò">
      <CRow className="align-items-center justify-content-center">
        <CCol md={10} xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>🏫 Danh sách vai trò</strong>
              {/* add apartment modal */}
              <AddRoleModal submitAddRoleChange={getRoles} />
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                {roleList.length > 0 ? (
                  <>
                    <h6 className="my-4">📃 Danh sách vai trò trong hệ thống</h6>
                    <CTable striped responsive hover className="text-center text-nowrap">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Mã vai trò (ID)</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Tên vai trò</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {roleList.map((role) => {
                          return (
                            <CTableRow key={role.id}>
                              <CTableHeaderCell scope="row">{role.id}</CTableHeaderCell>
                              <CTableHeaderCell scope="row">{role.display}</CTableHeaderCell>
                              <CTableHeaderCell scope="row">
                                <UpdateRoleModal roleData={role} submitUpdateRoleChange={getRoles} />
                                <DeleteRoleModal roleId={role.id} submitDeleteRoleChange={getRoles} />
                              </CTableHeaderCell>
                            </CTableRow>
                          );
                        })}
                      </CTableBody>
                    </CTable>
                  </>
                ) : (
                  <SkeletonTheme color="#202020" highlightColor="#ccc">
                    <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
                    <Skeleton count={5} />
                  </SkeletonTheme>
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </Helmet>
  );
}
