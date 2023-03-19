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

// client pages
const ClientDashboard = React.lazy(() => import('../views/client/dashboard/Dashboard'));

const routes = [
  { path: '/trang-tong-quan', name: 'Tổng quan', role: 'quan-tri-vien', element: AdminDashboard },
  { path: '/quan-ly-chung-cu/khu-vuc', name: 'Chung cư / Khu vực', role: 'quan-tri-vien', element: BuildingAdmin },
  {
    path: '/quan-ly-chung-cu/khu-vuc/:areaDetails',
    name: 'Danh sách chung cư',
    role: 'quan-tri-vien',
    element: ApartmentList,
  },
  {
    path: '/quan-ly-chung-cu/khu-vuc/:areaDetails/:apartmentDetails',
    name: 'Thông tin căn hộ',
    role: 'quan-tri-vien',
    element: Apartment,
  },
  {
    path: '/quan-ly-chung-cu/khu-vuc/:areaDetails/:apartmentDetails/:parkingDetails',
    name: 'Thông tin bãi đỗ xe',
    role: 'quan-tri-vien',
    element: ParkingDetails,
  },
  {
    path: '/quan-ly-khu-vuc-giu-xe',
    name: 'Quản lý khu vực đỗ xe',
    role: 'quan-tri-vien',
    element: ParkingType,
  },
  {
    path: '/quan-ly-gia-ca',
    name: 'Quản lý giá cả',
    role: 'quan-tri-vien',
    element: PriceTag,
  },
  { path: '/quan-ly-hoa-don', name: 'Quản lý hoá đơn', role: 'quan-tri-vien', element: ManageBill },
  { path: '/hoa-don', name: 'Hoá đơn cá nhân', role: 'quan-tri-vien', element: Bill },
  { path: '/quan-ly-nguoi-dung', name: 'Quản lý người dùng', role: 'quan-tri-vien', element: AccountList },
  { path: '/quan-ly-nguoi-dung/:userId', name: 'Chi tiết người dùng', role: 'quan-tri-vien', element: AccountDetail },
  { path: '/thong-tin-ca-nhan', name: 'Thông tin cá nhân', role: 'quan-tri-vien', element: AccountCurrentDetail },
  { path: '/doi-mat-khau', name: 'Đổi mật khẩu', role: 'quan-tri-vien', element: ChangePassword },
];

const clientRoutes = [
  { path: '/trang-tong-quan', name: 'Tổng quan', role: 'nguoi-dung-thuong', element: ClientDashboard },
  { path: '/hoa-don', name: 'Hoá đơn cá nhân', role: 'nguoi-dung-thuong', element: Bill },
  { path: '/thong-tin-ca-nhan', name: 'Thông tin cá nhân', role: 'nguoi-dung-thuong', element: AccountCurrentDetail },
  { path: '/doi-mat-khau', name: 'Đổi mật khẩu', role: 'nguoi-dung-thuong', element: ChangePassword },
];

export { routes, clientRoutes };
