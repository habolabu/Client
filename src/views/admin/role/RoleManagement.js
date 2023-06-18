/* eslint-disable react-hooks/exhaustive-deps */
// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';
import { CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { useState } from 'react';
import authServices from 'src/api/auth/authServices';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Helmet from 'src/components/helmet/helmet';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import AddRoleModal from 'src/components/adminComponents/role/AddRoleModal';
import DeleteRoleModal from 'src/components/adminComponents/role/DeleteRoleModal';
import UpdateRoleModal from 'src/components/adminComponents/role/UpdateRoleModal';
import { Box } from '@mui/material';

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
          <Box className="box-title">
            <strong>Danh sách vai trò</strong>
            {/* add apartment modal */}
            <AddRoleModal submitAddRoleChange={getRoles} />
          </Box>
          <CRow className="mb-3">
            {roleList.length > 0 ? (
              <>
                <CTable striped responsive hover className="text-nowrap table-custom">
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
                        <CTableRow key={role.id} scope="row">
                          <CTableDataCell>{role.id}</CTableDataCell>
                          <CTableDataCell>{role.display}</CTableDataCell>
                          <CTableDataCell>
                            <UpdateRoleModal roleData={role} submitUpdateRoleChange={getRoles} />
                            <DeleteRoleModal roleId={role.id} submitDeleteRoleChange={getRoles} />
                          </CTableDataCell>
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
              </>
            ) : (
              <SkeletonTheme color="#202020" highlightColor="#ccc">
                <p className="text-danger fw-bold">Không có thông tin !!!</p>
                <Skeleton count={3} />
              </SkeletonTheme>
            )}
          </CRow>
        </CCol>
      </CRow>
    </Helmet>
  );
}
