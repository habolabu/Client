import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cibGooglePlay,
  cilBuilding,
  cilCarAlt,
  cilCart,
  cilDollar,
  cilLockLocked,
  cilPeople,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons';
import { CNavItem, CNavTitle } from '@coreui/react';

const _navAdmin = [
  {
    component: CNavItem,
    name: 'Tổng quan',
    to: '/quan-tri-vien/trang-tong-quan',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Quản lý Chung cư',
  },
  {
    component: CNavItem,
    name: 'Chung cư',
    to: '/quan-tri-vien/quan-ly-chung-cu/khu-vuc',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Khu vực giữ xe',
    to: '/quan-tri-vien/quan-ly-khu-vuc-giu-xe',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý giá cả',
    to: '/quan-tri-vien/quan-ly-gia-ca',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Quản lý người dùng',
  },
  {
    component: CNavItem,
    name: 'Quản lý người dùng',
    to: '/quan-tri-vien/quan-ly-nguoi-dung',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Quản lý hoá đơn',
  },
  {
    component: CNavItem,
    name: 'Quản lý hoá đơn',
    to: '/quan-tri-vien/quan-ly-hoa-don',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Hoá đơn cá nhân',
    to: '/quan-tri-vien/hoa-don',
    icon: <CIcon icon={cibGooglePlay} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Quản lý tài khoản',
  },
  {
    component: CNavItem,
    name: 'Thông tin cá nhân',
    to: '/quan-tri-vien/thong-tin-ca-nhan',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Đổi mật khẩu',
    to: '/quan-tri-vien/doi-mat-khau',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
];

export default _navAdmin;
