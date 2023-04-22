// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';
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
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { useState } from 'react';
import authServices from 'src/api/auth/authServices';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Helmet from 'src/components/helmet/helmet';
import { Checkbox } from '@mui/material';

function Row(props) {
  const { permission, roleList } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{permission.id}</TableCell>
        <TableCell>{permission.display}</TableCell>
        {/* {roleList.map((role) => {
          return (
            <TableCell key={role.id} align="center">
              <Checkbox checked={permission.status} inputProps={{ 'aria-label': 'controlled' }} />
            </TableCell>
          );
        })} */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>Mã phân quyền</TableCell>
                <TableCell>Tên quyền</TableCell>
                {/* {roleList.map((role) => {
                  return (
                    <TableCell key={role.id} align="center">
                      <Checkbox checked={permission.status} inputProps={{ 'aria-label': 'controlled' }} />
                    </TableCell>
                  );
                })} */}
              </TableHead>
              <TableBody>
                {permission.permissionDocuments.map((permissionDocument) => (
                  <TableRow key={permissionDocument.childOrder}>
                    <TableCell></TableCell>
                    <TableCell> {permissionDocument.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {permissionDocument.display}
                    </TableCell>
                    {/* {roleList.map((role) => {
                      return (
                        <TableCell key={role.id} align="center">
                          <Checkbox checked={permissionDocument.status} inputProps={{ 'aria-label': 'controlled' }} />
                        </TableCell>
                      );
                    })} */}
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
  permission: PropTypes.shape({
    id: PropTypes.number,
    display: PropTypes.string,
    status: PropTypes.bool,
    permissionDocuments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        display: PropTypes.string,
        status: PropTypes.bool,
      }),
    ),
  }),
  roleList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      display: PropTypes.string,
    }),
  ),
};

export default function PermissionList() {
  const [roleList, setRoleList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);

  const getRoles = async () => {
    try {
      const res = await authServices.getAllRole();
      if (res && res.data) {
        setRoleList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách phân quyền ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách phân quyền: ', error);
      toast.error('Thất bại khi lấy danh sách phân quyền ! ', { theme: 'colored' });
    }
  };

  const getPermissions = async () => {
    try {
      const res = await authServices.getAllPermission();
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
    async function fetchData() {
      await getRoles();
      await getPermissions();
    }
    fetchData();
  }, []);

  return (
    <Helmet title="Danh sách quyền">
      <CCard>
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <strong>🕵️‍♀️ Quản lý phân quyền</strong>
        </CCardHeader>
        <CCardBody>
          <p>Danh sách phân quyền người dùng</p>
        </CCardBody>
      </CCard>
      {roleList.length > 0 ? (
        <TableContainer component={Paper} className="mt-3 mb-5">
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Mã phân quyền</TableCell>
                <TableCell>Tên quyền</TableCell>
                {roleList.map((role) => {
                  return (
                    <TableCell align="center" key={role.id}>
                      {role.display}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {permissionList.length > 0 ? (
                <>
                  {permissionList.map((permission) => (
                    <Row key={permission.id} permission={permission} roleList={roleList} />
                  ))}
                </>
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
      )}
    </Helmet>
  );
}
