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
  cilFeaturedPlaylist,
  cilLibraryBuilding,
  cilList,
  cilListRich,
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
    name: 'Cơ sở vật chất',
    icon: <CIcon icon={cilLibraryBuilding} customClassName="nav-icon" />,
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
        name: 'Giá cả',
        to: '/habolabu/quan-ly-gia-ca',
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_PRICE_TAG],
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Người dùng',
    to: '/habolabu/quan-ly-nguoi-dung',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    permissions: [PermissionDirection.VIEW_USER],
  },
  {
    component: CNavGroup,
    name: 'Hoá đơn',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    permissions: [],
    items: [
      {
        component: CNavItem,
        name: 'Danh sách hoá đơn',
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
    name: 'Hoạt động',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
    permissions: [],
    items: [
      {
        component: CNavItem,
        name: 'Bài viết',
        to: '/habolabu/bai-viet',
        icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
        permissions: [],
      },
      {
        component: CNavItem,
        name: 'Cảm xúc',
        to: '/habolabu/quan-ly-cam-xuc',
        icon: <CIcon icon={cilMoodGood} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_EMOTION],
      },
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
    name: 'Tài khoản',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    permissions: [],
    items: [
      {
        component: CNavItem,
        name: 'Thông tin cá nhân',
        to: '/habolabu/thong-tin-ca-nhan',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        permissions: [],
      },
      // {
      //   component: CNavItem,
      //   name: 'Đổi mật khẩu',
      //   to: '/habolabu/doi-mat-khau',
      //   icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
      //   permissions: [],
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Bảo mật',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
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
        name: 'Vai trò người dùng',
        to: '/habolabu/danh-sach-vai-tro',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        permissions: [PermissionDirection.VIEW_ROLE, PermissionDirection.VIEW_PERMISSION],
      },
    ],
  },
];

export default _navAdmin;
