/* eslint-disable react-hooks/exhaustive-deps */
// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CRow } from '@coreui/react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import authServices from 'src/api/auth/authServices';
import { toast } from 'react-toastify';
import Helmet from 'src/components/helmet/helmet';
import { Checkbox } from '@mui/material';
import uuid from 'react-uuid';
import { permissionLocal } from 'src/utils/permissionLocal';

function Row(props) {
  const { accountId, permissionAccount, submitCheckedChange } = props;
  const [open, setOpen] = useState(false);

  const grantPermission = async (accountId, permissionId, roleId, status) => {
    try {
      const params = {
        referenceKey: {
          accountId: accountId,
          permissionId: permissionId,
          roleId: roleId,
        },
        status: !status,
      };
      const res = await authServices.grantPermission(params);
      if (res && res.data) {
        toast.success('Cập nhật thành công ! ', {
          theme: 'colored',
        });
        submitCheckedChange();
      } else {
        toast.error('Thất bại khi cập nhật quyền ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi cập nhật quyền: ', error);
      toast.error('Thất bại khi cập nhật quyền ! ', { theme: 'colored' });
    }
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{permissionAccount[0].permissionBlock.id}</TableCell>
        <TableCell>{permissionAccount[0].permissionBlock.display}</TableCell>
        {permissionAccount.map((role) => {
          return <TableCell key={role.permissionBlock.id} align="center"></TableCell>;
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {permissionAccount[0].permissionBlock.permissionDocuments.map((permissionDocument, index) => (
                  <TableRow key={permissionDocument.childOrder}>
                    <TableCell></TableCell>
                    <TableCell>{permissionDocument.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {permissionDocument.display}
                    </TableCell>
                    {permissionAccount.map((role) => {
                      return (
                        <TableCell key={uuid()} align="center">
                          <Checkbox
                            defaultChecked={role.permissionBlock.permissionDocuments[index].status}
                            // onChange={handleChange}
                            onClick={() => {
                              grantPermission(
                                accountId,
                                role.permissionBlock.permissionDocuments[index].id,
                                role.roleId,
                                role.permissionBlock.permissionDocuments[index].status,
                              );
                            }}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  permissionAccount: PropTypes.array,
  accountId: PropTypes.number,
  submitCheckedChange: PropTypes.func,
};

export default function SearchRole() {
  const [permissionListAccount, setPermissionListAccount] = useState([]);
  const [accountId, setAccountId] = useState(0);
  let permissionsAccount = [];

  useEffect(() => {
    const callApiGetUser = setTimeout(() => {
      getPermissionsAccount();
    }, 1000);
    return () => {
      clearTimeout(callApiGetUser);
    };
  }, [accountId]);

  const getPermissionsAccount = async () => {
    try {
      const res = await authServices.getPermissionAccount(accountId);
      if (res && res.data) {
        setPermissionListAccount(res.data.response.body);
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

  const savePermissionsCurrent = async () => {
    try {
      const res = await authServices.getAllPermissionCurrentUser();
      if (res && res.data) {
        res.data.response.body.forEach((permissionsRoles) => {
          permissionsRoles.permissions.forEach((permissionDocument) => {
            permissionDocument.permissionDocuments.forEach((permission) => {
              if (permission.status) {
                permissionsAccount.push(permission.name);
              }
            });
          });
        });
        permissionLocal.saveData(permissionsAccount);
      } else {
        console.log('Thất bại khi lấy danh sách quyền');
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách quyền: ', error);
    }
  };

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

              {permissionListAccount.length > 0 ? (
                <>
                  <h6 className="my-4">📃 Danh sách phân quyền tài khoản</h6>
                  {permissionListAccount.length > 0 ? (
                    <TableContainer component={Paper} className="mt-3 mb-5">
                      <Table aria-label="collapsible table">
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell>Mã phân quyền</TableCell>
                            <TableCell>Tên quyền</TableCell>
                            {permissionListAccount.map((role) => {
                              return (
                                <TableCell align="center" key={role.roleId}>
                                  {role.roleDisplay}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {permissionListAccount[0].permissions.map((permission, index) => {
                            let permissionListPerRow = [];
                            permissionListAccount.forEach((role) => {
                              permissionListPerRow.push({
                                roleName: role.roleName,
                                roleId: role.roleId,
                                permissionBlock: role.permissions[index],
                              });
                            });
                            return (
                              <Row
                                key={index}
                                permissionAccount={permissionListPerRow}
                                accountId={parseInt(accountId)}
                                submitCheckedChange={(getPermissionsAccount, savePermissionsCurrent)}
                              />
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
                  )}
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
