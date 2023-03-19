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
      if (res.response.message === 'Successful') {
        setRoomList(res.response.body);
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
    <CCol md={6} xs={12}>
      <h5 className="mb-3">📝 Thông tin danh sách các phòng</h5>
      <CCard className="mb-4">
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <strong>🏠 Danh sách các phòng</strong>
          {/* add room modal */}
          <AddRoomModal apartmentId={apartmentId} submitAddRoomChange={getRoomList} />
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3 justify-content-center">
            <CCol md={12} sm={12}>
              <CFormLabel htmlFor="searchNameRoom" className="col-sm-12 col-form-label">
                🔍 Tìm kiếm theo tên phòng
              </CFormLabel>
              <CFormInput
                type="text"
                id="searchNameRoom"
                placeholder="Nhập tên phòng ..."
                onChange={(e) => setNameRoom(e.target.value)}
              />
            </CCol>
            <CCol md={6} sm={12}>
              <CFormLabel htmlFor="searchBFloorNumber" className="col-sm-12 col-form-label">
                🔍 Số tầng (bắt đầu)
              </CFormLabel>
              <CFormInput
                type="text"
                id="searchBFloorNumber"
                placeholder="Nhập số bắt đầu..."
                onChange={(e) => setBeginFloorNumber(e.target.value)}
              />
            </CCol>
            <CCol md={6} sm={12}>
              <CFormLabel htmlFor="searchEFloorNumber" className="col-sm-12 col-form-label">
                🔍 Số tầng (kết thúc)
              </CFormLabel>
              <CFormInput
                type="text"
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
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
            </>
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

export default RoomList;
