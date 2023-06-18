// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFooter,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';

import { toast } from 'react-toastify';

import roomServices from 'src/api/buildingServices/roomServices';

import AddRoomModal from 'src/components/adminComponents/buiding/room/AddRoomModal';
import DeleteRoomModal from 'src/components/adminComponents/buiding/room/DeleteRoomModal';
import DetailsRoomModal from 'src/components/adminComponents/buiding/room/DetailsRoomModal';
import EditRoomModal from 'src/components/adminComponents/buiding/room/EditRoomModal';
import Page403 from 'src/views/pages/auth/Page403';
import PermissionDirection from 'src/utils/PermissionDirection';
import { permissionLocal } from 'src/utils/permissionLocal';
import AssignUserRoomModal from 'src/components/adminComponents/buiding/room/AssignUserRoomModal';
import DeleteUserRoomModal from 'src/components/adminComponents/buiding/room/DeleteUserRoomModal';

const RoomList = ({ apartmentId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [roomList, setRoomList] = useState([]);

  // search room
  const [nameRoom, setNameRoom] = useState('');
  const [beginFloorNumber, setBeginFloorNumber] = useState('');
  const [endFloorNumber, setEndFloorNumber] = useState('');

  // get room list
  const getRoomList = async () => {
    try {
      const params = {
        page: currentPage,
        name: nameRoom,
        bFloorNumber: beginFloorNumber,
        eFloorNumber: endFloorNumber,
        apartmentId: apartmentId,
      };
      const res = await roomServices.getRoom(params);
      if (res && res.data) {
        setRoomList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách phòng ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách phòng: ', error);
      toast.error('Thất bại khi lấy danh sách phòng ! ', { theme: 'colored' });
    }
  };

  useEffect(() => {
    const callApiRoom = setTimeout(() => {
      getRoomList();
    }, 500);

    return () => {
      clearTimeout(callApiRoom);
    };
  }, [currentPage, nameRoom, beginFloorNumber, endFloorNumber]);

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <CCol xs={12}>
      {permissionLocal.isExistPermission(PermissionDirection.VIEW_ROOM) ? (
        <>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>🏠 Danh sách các phòng</strong>
              {/* add room modal */}
              {permissionLocal.isExistPermission(PermissionDirection.ADD_NEW_ROOM) ? (
                <AddRoomModal apartmentId={apartmentId} submitAddRoomChange={getRoomList} />
              ) : null}
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3 justify-content-center">
                <CCol md={12} sm={12}>
                  <CFormInput
                    type="text"
                    floatingLabel="🔍 Tìm kiếm theo tên phòng"
                    className="my-2"
                    id="searchNameRoom"
                    placeholder="Nhập tên phòng ..."
                    onChange={(e) => setNameRoom(e.target.value)}
                  />
                </CCol>
                <CCol md={6} sm={12}>
                  <CFormInput
                    type="text"
                    floatingLabel="🔍 Số tầng (bắt đầu)"
                    className="my-2"
                    id="searchBFloorNumber"
                    placeholder="Nhập số bắt đầu..."
                    onChange={(e) => setBeginFloorNumber(e.target.value)}
                  />
                </CCol>
                <CCol md={6} sm={12}>
                  <CFormInput
                    type="text"
                    floatingLabel="🔍 Số tầng (kết thúc)"
                    className="my-2"
                    id="searchEFloorNumber"
                    placeholder="Nhập số kết thúc..."
                    onChange={(e) => setEndFloorNumber(e.target.value)}
                  />
                </CCol>
              </CRow>
              {roomList.totalPage > 0 ? (
                <>
                  <h6 className="my-4">📃 Danh sách phòng</h6>
                  <CTable striped responsive hover className="text-center text-nowrap">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Mã phòng (ID)</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Tên phòng</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Vị trí</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Trạng thái phòng</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Chủ phòng</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {roomList.data.map((room) => {
                        return (
                          <CTableRow key={room.id}>
                            <CTableHeaderCell scope="row">{room.id}</CTableHeaderCell>
                            <CTableDataCell>{room.name}</CTableDataCell>
                            <CTableDataCell>Tầng {room.floorNumber}</CTableDataCell>
                            {room.owner !== null ? (
                              <>
                                <CTableDataCell>Đã có chủ</CTableDataCell>
                                <CTableDataCell>
                                  {room.owner.ownerInfo.lastName} {room.owner.ownerInfo.firstName}
                                </CTableDataCell>
                              </>
                            ) : (
                              <>
                                <CTableDataCell>Chưa có chủ</CTableDataCell>
                                <CTableDataCell>Trống</CTableDataCell>
                              </>
                            )}
                            <CTableDataCell>
                              {/* add details room modal */}
                              <DetailsRoomModal slug={room.slug} />
                              {/* add edit room modal */}
                              <EditRoomModal
                                apartmentId={room.apartmentId}
                                roomId={room.id}
                                name={room.name}
                                floorNumber={room.floorNumber}
                                submitEditRoomChange={getRoomList}
                              />
                              {/* add delete room modal */}
                              <DeleteRoomModal slug={room.slug} submitDeleteRoomChange={getRoomList} />
                              {room.owner !== null ? (
                                <>
                                  <DeleteUserRoomModal idRecord={room.id} submitDeleteUserRoomChange={getRoomList} />
                                </>
                              ) : (
                                <AssignUserRoomModal roomId={room.id} submitAssignUserRoomChange={getRoomList} />
                              )}
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
            </CCardBody>
            <CFooter>
              {/* pagination */}
              {roomList.totalPage > 1 ? (
                <CCol xs={12}>
                  <div className={'mt-2'}>
                    <ReactPaginate
                      previousLabel={'<<'}
                      nextLabel={'>>'}
                      breakLabel={'...'}
                      pageCount={roomList.totalPage}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination justify-content-center'}
                      pageClassName={'page-item'}
                      pageLinkClassName={'page-link'}
                      previousClassName={'page-item'}
                      previousLinkClassName={'page-link'}
                      nextClassName={'page-item'}
                      nextLinkClassName={'page-link'}
                      breakClassName={'page-item'}
                      breakLinkClassName={'page-link'}
                      activeClassName={'active'}
                    />
                  </div>
                </CCol>
              ) : null}
            </CFooter>
          </CCard>
        </>
      ) : (
        <Page403 />
      )}
    </CCol>
  );
};

export default RoomList;
