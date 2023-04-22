// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cibGooglePlay,
  cilBookmark,
  cilBuilding,
  cilCarAlt,
  cilCart,
  cilDollar,
  cilLockLocked,
  cilMoodGood,
  cilNewspaper,
  cilNotes,
  cilPeople,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';
import PermissionDirection from 'src/utils/PermissionDirection';

const _navAdmin = [
  {
    component: CNavItem,
    name: 'Tổng quan',
    to: '/habolabu/trang-tong-quan',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    permissions: [],
  },
  {
    component: CNavGroup,
    name: 'Quản lý Chung cư',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    permissions: [PermissionDirection.VIEW_AREA, PermissionDirection.VIEW_PARKING, PermissionDirection.VIEW_PRICE_TAG],
    items: [
      {
        component: CNavItem,
        name: 'Chung cư',
        to: '/habolabu/quan-ly-chung-cu/khu-vuc',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_AREA],
      },
      {
        component: CNavItem,
        name: 'Khu vực giữ xe',
        to: '/habolabu/quan-ly-khu-vuc-giu-xe',
        icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_PARKING],
      },
      {
        component: CNavItem,
        name: 'Quản lý giá cả',
        to: '/habolabu/quan-ly-gia-ca',
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_PRICE_TAG],
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Quản lý người dùng',
    to: '/habolabu/quan-ly-nguoi-dung',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    permissions: [PermissionDirection.VIEW_USER],
  },
  {
    component: CNavGroup,
    name: 'Quản lý hoá đơn',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    permissions: [],
    items: [
      {
        component: CNavItem,
        name: 'Quản lý hoá đơn',
        to: '/habolabu/quan-ly-hoa-don',
        icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
        permissions: [],
      },
      {
        component: CNavItem,
        name: 'Hoá đơn cá nhân',
        to: '/habolabu/hoa-don',
        icon: <CIcon icon={cibGooglePlay} customClassName="nav-icon" />,
        permissions: [],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản lý hoạt động',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    permissions: [],
    items: [
      {
        component: CNavItem,
        name: 'Quản lý bài viết',
        to: '/habolabu/bai-viet',
        icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
        permissions: [],
      },
      {
        component: CNavItem,
        name: 'Quản lý cảm xúc',
        to: '/habolabu/quan-ly-cam-xuc',
        icon: <CIcon icon={cilMoodGood} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_EMOTION],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản lý phản hồi',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    permissions: [],
    items: [
      {
        component: CNavItem,
        name: 'Loại phản hồi',
        to: '/habolabu/loai-phan-hoi',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_FEEDBACK_TYPE],
      },
      {
        component: CNavItem,
        name: 'Danh sách phản hồi',
        to: '/habolabu/danh-sach-phan-hoi',
        icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
        permissions: [],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản lý tài khoản',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    permissions: [],
    items: [
      {
        component: CNavItem,
        name: 'Thông tin cá nhân',
        to: '/habolabu/thong-tin-ca-nhan',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        permissions: [],
      },
      {
        component: CNavItem,
        name: 'Đổi mật khẩu',
        to: '/habolabu/doi-mat-khau',
        icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
        permissions: [],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản lý quyền',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    permissions: [PermissionDirection.VIEW_ROLE, PermissionDirection.VIEW_PERMISSION],
    items: [
      {
        component: CNavItem,
        name: 'Quyền người dùng',
        to: '/habolabu/quyen-nguoi-dung',
        icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_ROLE, PermissionDirection.VIEW_PERMISSION],
      },
      {
        component: CNavItem,
        name: 'Danh sách vai trò',
        to: '/habolabu/danh-sach-vai-tro',
        icon: <CIcon icon={cilMoodGood} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_ROLE, PermissionDirection.VIEW_PERMISSION],
      },
      {
        component: CNavItem,
        name: 'Danh sách phân quyền',
        to: '/habolabu/danh-sach-phan-quyen',
        icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_ROLE, PermissionDirection.VIEW_PERMISSION],
      },
    ],
  },
];

export default _navAdmin;
