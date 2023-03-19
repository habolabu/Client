import React from 'react';
import CIcon from '@coreui/icons-react';
import { cibGooglePlay, cilLockLocked, cilSpeedometer, cilUser } from '@coreui/icons';
import { CNavItem, CNavTitle } from '@coreui/react';

const _navClient = [
  {
    component: CNavItem,
    name: 'Tổng quan',
    to: '/nguoi-dung-thuong/trang-tong-quan',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Quản lý hoá đơn',
  },
  {
    component: CNavItem,
    name: 'Hoá đơn cá nhân',
    to: '/nguoi-dung-thuong/hoa-don',
    icon: <CIcon icon={cibGooglePlay} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Quản lý tài khoản',
  },
  {
    component: CNavItem,
    name: 'Thông tin cá nhân',
    to: '/nguoi-dung-thuong/thong-tin-ca-nhan',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Đổi mật khẩu',
    to: '/nguoi-dung-thuong/doi-mat-khau',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
];

export default _navClient;
