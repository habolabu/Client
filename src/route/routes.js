// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';

// admin pages
const AdminDashboard = React.lazy(() => import('../views/admin/dashboard/Dashboard'));
const BuildingAdmin = React.lazy(() => import('../views/admin/building/Building'));
const Apartment = React.lazy(() => import('../views/admin/building/Apartment'));
const ApartmentList = React.lazy(() => import('../views/admin/building/ApartmentList'));
const ParkingDetails = React.lazy(() => import('../views/admin/building/ParkingDetails'));
const ParkingType = React.lazy(() => import('../views/admin/building/ParkingType'));
const PriceTag = React.lazy(() => import('../views/admin/building/PriceTag'));
const AccountList = React.lazy(() => import('../views/admin/human/AccountList'));
const AccountDetail = React.lazy(() => import('../views/admin/human/AccountDetail'));
const AccountCurrentDetail = React.lazy(() => import('../views/pages/account/AccountCurrentDetail'));
const ChangePassword = React.lazy(() => import('../views/pages/account/ChangePassword'));
const ManageBill = React.lazy(() => import('../views/admin/payment/ManageBill'));
const Bill = React.lazy(() => import('../views/pages/payment/Bill'));
const PostList = React.lazy(() => import('../views/pages/activity/post/PostList'));
const PostDetail = React.lazy(() => import('../views/pages/activity/post/PostDetail'));
const PostUpdate = React.lazy(() => import('../views/pages/activity/post/PostUpdate'));
const NewsFeed = React.lazy(() => import('../views/pages/activity/post/NewsFeed'));
const PostCreate = React.lazy(() => import('../views/pages/activity/post/PostCreate'));
const ManageEmotion = React.lazy(() => import('../views/pages/activity/emotion/ManageEmotion'));
const FeedbackType = React.lazy(() => import('../views/pages/activity/feedback/FeedbackType'));
const Feedback = React.lazy(() => import('../views/pages/activity/feedback/Feedback'));
const SearchRole = React.lazy(() => import('../views/admin/role/SearchRole'));
const RoleManagement = React.lazy(() => import('../views/admin/role/RoleManagement'));
const Page403 = React.lazy(() => import('../views/pages/auth/Page403'));
const Page404 = React.lazy(() => import('../views/pages/auth/Page404'));

const routes = [
  {
    path: '/trang-tong-quan',
    name: 'Tổng quan',
    element: AdminDashboard,
  },
  {
    path: '/quan-ly-chung-cu/khu-vuc',
    name: 'Chung cư / Khu vực',
    element: BuildingAdmin,
  },
  {
    path: '/quan-ly-chung-cu/khu-vuc/:areaDetails',
    name: 'Danh sách chung cư',
    element: ApartmentList,
  },
  {
    path: '/quan-ly-chung-cu/khu-vuc/:areaDetails/:apartmentDetails',
    name: 'Thông tin căn hộ',
    element: Apartment,
  },
  {
    path: '/quan-ly-chung-cu/khu-vuc/:areaDetails/:apartmentDetails/:parkingDetails',
    name: 'Thông tin bãi đỗ xe',
    element: ParkingDetails,
  },
  {
    path: '/quan-ly-khu-vuc-giu-xe',
    name: 'Quản lý khu vực đỗ xe',
    element: ParkingType,
  },
  {
    path: '/quan-ly-gia-ca',
    name: 'Quản lý giá cả',
    element: PriceTag,
  },
  {
    path: '/quan-ly-hoa-don',
    name: 'Quản lý hoá đơn',
    element: ManageBill,
  },
  {
    path: '/hoa-don',
    name: 'Hoá đơn cá nhân',
    element: Bill,
  },
  {
    path: '/quan-ly-nguoi-dung',
    name: 'Quản lý người dùng',
    element: AccountList,
  },
  {
    path: '/bai-viet',
    name: 'Quản lý bài viết',
    element: PostList,
  },
  {
    path: '/bai-viet/:postSlug',
    name: 'Chi tiết bài viết',
    element: PostDetail,
  },
  {
    path: '/bai-viet/chinh-sua/:postSlug',
    name: 'Chỉnh sửa bài viết',
    element: PostUpdate,
  },
  {
    path: '/tao-bai-viet',
    name: 'Tạo bài viết',
    element: PostCreate,
  },
  {
    path: '/tin-tuc',
    name: 'Tin tức',
    element: NewsFeed,
  },
  {
    path: '/quan-ly-cam-xuc',
    name: 'Quản lý cảm xúc',
    element: ManageEmotion,
  },
  {
    path: '/loai-phan-hoi',
    name: 'Quản lý loại phản hồi',
    element: FeedbackType,
  },
  {
    path: '/danh-sach-phan-hoi',
    name: 'Danh sách phản hồi',
    element: Feedback,
  },
  {
    path: '/quan-ly-nguoi-dung/:userId',
    name: 'Chi tiết người dùng',
    element: AccountDetail,
  },
  {
    path: '/thong-tin-ca-nhan',
    name: 'Thông tin cá nhân',
    element: AccountCurrentDetail,
  },
  {
    path: '/doi-mat-khau',
    name: 'Đổi mật khẩu',
    element: ChangePassword,
  },
  {
    path: '/quyen-nguoi-dung',
    name: 'Quyền người dùng',
    element: SearchRole,
  },
  {
    path: '/danh-sach-vai-tro',
    name: 'Danh sách vai trò',
    element: RoleManagement,
  },
  {
    path: '/403',
    name: 'Không có quyền truy cập',
    element: Page403,
  },
  {
    path: '/404',
    name: 'Không tìm thấy trang',
    element: Page404,
  },
];

export { routes };
