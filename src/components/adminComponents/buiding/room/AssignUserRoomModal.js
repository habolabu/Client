// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import ownerHistoryServices from 'src/api/buildingServices/ownerHistoryServices';
import { BiPlusMedical } from 'react-icons/bi';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';
import userServices from 'src/api/humanServices/userServices';

const AssignUserRoomModal = ({ roomId, submitAssignUserRoomChange }) => {
  const [visibleDeleteRoom, setVisibleDeleteRoom] = useState(false);
  const [userList, setUserList] = useState([]);
  const [assignUser, setAssignUser] = useState(null);

  // get data page
  const getUsers = async () => {
    try {
      const res = await userServices.getAllUsers();
      if (res && res.data) {
        setUserList(
          res.data.response.body.map(({ firstName, lastName, id }) => ({
            label: `${lastName} ${firstName}`,
            idUser: id,
          })),
        );
      } else {
        toast.error('Thất bại khi lấy danh sách tài khoản ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log('Vui lòng nhập đúng định dạng ngày sinh (yyyy-mm-dd): ', error);
        toast.error('Vui lòng nhập đúng định dạng ngày sinh (yyyy-mm-dd) ! ', {
          theme: 'colored',
        });
      } else
        toast.error('Tìm kiếm thất bại ! ', {
          theme: 'colored',
        });
    }
  };

  useEffect(() => {
    const callApiGetUser = setTimeout(() => {
      getUsers();
    }, 500);
    return () => {
      clearTimeout(callApiGetUser);
    };
  }, []);

  const handleAssignUserRoom = async () => {
    try {
      const params = {
        roomId: roomId,
        ownerId: assignUser.idUser,
      };
      const res = await ownerHistoryServices.assignUserToRoom(params);
      if (res && res.data) {
        toast.success('Thêm thành công !', { theme: 'colored' });
        submitAssignUserRoomChange();
      } else {
        toast.error('Thêm thất bại ! ', { theme: 'colored' });
      }
    } catch (error) {
      console.log('Thêm thất bại: ', error);
      toast.error('Thêm thất bại ! ', { theme: 'colored' });
    }
  };

  return (
    <>
      <Tippy content="Thêm chủ phòng">
        <CButton color="success" size="sm" className="me-2" onClick={() => setVisibleDeleteRoom(!visibleDeleteRoom)}>
          <BiPlusMedical />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDeleteRoom}
        onClose={() => setVisibleDeleteRoom(false)}
      >
        <CModalHeader>
          <CModalTitle>Thêm chủ phòng</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Autocomplete
            disablePortal
            id="search-user-room"
            options={userList}
            onChange={(event, assignUser) => {
              setAssignUser(assignUser);
            }}
            renderInput={(params) => <TextField {...params} label="Tìm chủ phòng" focused />}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDeleteRoom(false)}>
            Huỷ
          </CButton>
          <CButton
            color="success"
            onClick={() => {
              handleAssignUserRoom();
              setVisibleDeleteRoom(false);
            }}
          >
            Thêm chủ phòng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AssignUserRoomModal;
