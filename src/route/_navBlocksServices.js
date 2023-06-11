// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import cityHall from '../assets/lottie/city-hall.json';
import coins from '../assets/lottie/coins.json';
import home from '../assets/lottie/home.json';
import permission from '../assets/lottie/permission.json';
import personActivity from '../assets/lottie/person-activity.json';
import user from '../assets/lottie/user.json';
import chat from '../assets/lottie/chat.json';
import car from '../assets/lottie/car.json';
import document from '../assets/lottie/document.json';
import book from '../assets/lottie/book.json';
import emoji from '../assets/lottie/emoji.json';
import avatar from '../assets/lottie/avatar.json';
import fingerprint from '../assets/lottie/fingerprint.json';

import PermissionDirection from 'src/utils/PermissionDirection';

const _navBlocksServices = [
  {
    name: 'Quản lý Chung cư',
    icon: cityHall,
    permissions: [PermissionDirection.VIEW_AREA, PermissionDirection.VIEW_PARKING, PermissionDirection.VIEW_PRICE_TAG],
    items: [
      {
        name: 'Chung cư',
        to: '/habolabu/quan-ly-chung-cu/khu-vuc',
        icon: home,
        permissions: [PermissionDirection.VIEW_AREA],
      },
      {
        name: 'Khu vực giữ xe',
        to: '/habolabu/quan-ly-khu-vuc-giu-xe',
        icon: car,
        permissions: [PermissionDirection.VIEW_PARKING],
      },
      {
        name: 'Quản lý giá cả',
        to: '/habolabu/quan-ly-gia-ca',
        icon: coins,
        permissions: [PermissionDirection.VIEW_PRICE_TAG],
      },
    ],
  },
  {
    name: 'Quản lý hoá đơn',
    icon: coins,
    permissions: [PermissionDirection.APPROVE_BILL, PermissionDirection.REJECT_BILL, PermissionDirection.VIEW_BILL],
    items: [
      {
        name: 'Quản lý hoá đơn',
        to: '/habolabu/quan-ly-hoa-don',
        icon: coins,
        permissions: [PermissionDirection.APPROVE_BILL, PermissionDirection.REJECT_BILL],
      },
      {
        name: 'Hoá đơn cá nhân',
        to: '/habolabu/hoa-don',
        icon: document,
        permissions: [PermissionDirection.VIEW_BILL],
      },
    ],
  },
  {
    name: 'Quản lý hoạt động',
    icon: personActivity,
    permissions: [
      PermissionDirection.VIEW_POST,
      PermissionDirection.VIEW_EMOTION,
      PermissionDirection.VIEW_FEEDBACK_TYPE,
      PermissionDirection.VIEW_FEEDBACK,
    ],
    items: [
      {
        name: 'Quản lý bài viết',
        to: '/habolabu/bai-viet',
        icon: book,
        permissions: [PermissionDirection.VIEW_POST],
      },
      {
        name: 'Quản lý cảm xúc',
        to: '/habolabu/quan-ly-cam-xuc',
        icon: emoji,
        permissions: [PermissionDirection.VIEW_EMOTION],
      },
      {
        name: 'Loại phản hồi',
        to: '/habolabu/loai-phan-hoi',
        icon: document,
        permissions: [PermissionDirection.VIEW_FEEDBACK_TYPE],
      },
      {
        name: 'Danh sách phản hồi',
        to: '/habolabu/danh-sach-phan-hoi',
        icon: document,
        permissions: [PermissionDirection.VIEW_FEEDBACK],
      },
    ],
  },
  {
    name: 'Quản lý tài khoản',
    icon: user,
    permissions: [],
    items: [
      {
        name: 'Danh sách người dùng',
        to: '/habolabu/quan-ly-nguoi-dung',
        icon: user,
        permissions: [PermissionDirection.VIEW_USER],
      },
      {
        name: 'Thông tin cá nhân',
        to: '/habolabu/thong-tin-ca-nhan',
        icon: avatar,
        permissions: [],
      },
      // {
      //   name: 'Đổi mật khẩu',
      //   to: '/habolabu/doi-mat-khau',
      //   icon: fingerprint,
      //   permissions: [],
      // },
    ],
  },
  {
    name: 'Quản lý quyền',
    icon: permission,
    permissions: [PermissionDirection.VIEW_ROLE, PermissionDirection.VIEW_PERMISSION],
    items: [
      {
        name: 'Quyền người dùng',
        to: '/habolabu/quyen-nguoi-dung',
        icon: permission,
        permissions: [PermissionDirection.VIEW_ROLE, PermissionDirection.VIEW_PERMISSION],
      },
      {
        name: 'Danh sách vai trò',
        to: '/habolabu/danh-sach-vai-tro',
        icon: permission,
        permissions: [PermissionDirection.VIEW_ROLE, PermissionDirection.VIEW_PERMISSION],
      },
    ],
  },
  {
    name: 'Chat',
    icon: chat,
    permissions: [],
    items: [],
    link: 'https://rocketchat-habolabu-nguyentrungkien01.cloud.okteto.net/',
  },
];

export default _navBlocksServices;
