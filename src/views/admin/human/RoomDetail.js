/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFooter,
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

import roomDetailServices from 'src/api/humanServices/roomDetailServices';

const RoomDetail = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [roomList, setRoomList] = useState([]);

  // get room list
  const getRoomList = async () => {
    try {
      const params = {
        page: currentPage,
      };
      const res = await roomDetailServices.getRoom(params);
      console.log(res);
      if (res.response.message === 'Successful') {
        setRoomList(res.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách phòng ! ' + res.response.message, {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách phòng: ', error);
      toast.error('Thất bại khi lấy danh sách phòng ! ' + error.message, { theme: 'colored' });
    }
  };

  useEffect(() => {
    const callApiRoom = setTimeout(() => {
      getRoomList();
    }, 500);

    return () => {
      clearTimeout(callApiRoom);
    };
  }, [currentPage]);

  // pagination
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <CCol md={6} xs={12}>
      <h5 className="mb-3">📝 Thông tin danh sách các phòng</h5>
      <CCard className="mb-4">
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <strong>📃 Danh sách các phòng</strong>
          {/* add room modal */}
          {/* <AddRoomModal apartmentId={apartmentId} submitAddRoomChange={getRoomList} /> */}
        </CCardHeader>
        <CCardBody>
          {roomList.totalPage > 0 ? (
            <CTable striped responsive hover className="text-center text-nowrap">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Mã phòng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ngày tham gia</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {roomList.data.map((room) => {
                  return (
                    <CTableRow key={room.roomId}>
                      <CTableHeaderCell scope="row">{room.roomId}</CTableHeaderCell>
                      <CTableDataCell>{room.joinDate.slice(0, 10)}</CTableDataCell>
                      <CTableDataCell>
                        {/* add details room modal */}
                        {/* add edit room modal */}
                        {/* <EditRoomModal
                          apartmentId={room.apartmentId}
                          roomId={room.id}
                          name={room.name}
                          floorNumber={room.floorNumber}
                          submitEditRoomChange={getRoomList}
                        /> */}
                        {/* add delete room modal */}
                        {/* <DeleteRoomModal slug={room.slug} submitDeleteRoomChange={getRoomList} /> */}
                      </CTableDataCell>
                    </CTableRow>
                  );
                })}
              </CTableBody>
            </CTable>
          ) : (
            <SkeletonTheme color="#202020" highlightColor="#ccc">
              <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
              <Skeleton count={5} />
            </SkeletonTheme>
          )}
        </CCardBody>
        <CFooter>
          {/* pagination */}
          {roomList.data ? (
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
          ) : (
            <></>
          )}
        </CFooter>
      </CCard>
    </CCol>
  );
};

export default RoomDetail;
