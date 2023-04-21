/* eslint-disable react/no-unknown-property */
// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CContainer,
  CCardText,
  CBadge,
  CNavLink,
} from '@coreui/react';

import Helmet from 'src/components/helmet/helmet';

import { toast } from 'react-toastify';

import { Pagination, Skeleton, Button } from '@mui/material';

import postServices from 'src/api/activityServices/postServices';
import AddIcon from '@mui/icons-material/Add';
import CIcon from '@coreui/icons-react';
import { cilCommentBubble, cilMoodGood } from '@coreui/icons';
import { MdEdit } from 'react-icons/md';
import DeletePostModal from 'src/components/adminComponents/activity/post/DeletePostModal';
import { permissionLocal } from 'src/utils/permissionLocal';
import PermissionDirection from 'src/utils/PermissionDirection';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postTitle, setPostTitle] = useState(null);
  const [searchBeginDate, setSearchBeginDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');

  const getPostAll = async () => {
    try {
      const params = {
        page: currentPage,
        title: postTitle,
        bCreatedAt: searchBeginDate,
        eCreatedAt: searchEndDate,
      };
      const res = await postServices.getPostAll(params);
      if (res && res.data) {
        setPostList(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách bài viết ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách bài viết: ', error);
      toast.error('Thất bại khi lấy danh sách bài viết ! ', { theme: 'colored' });
    }
  };

  // get data page
  useEffect(() => {
    const callApiPost = setTimeout(() => {
      getPostAll();
    }, 500);

    return () => {
      clearTimeout(callApiPost);
    };
  }, [currentPage, postTitle, searchBeginDate, searchEndDate]);

  const handlePageClick = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Helmet title="Quản lý bài viết" role="Admin">
      <CContainer>
        {/* Action */}
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex align-items-center justify-content-between">
                <strong>Quản lý bài viết</strong>
                {permissionLocal.isExistPermission(PermissionDirection.ADD_NEW_POST) ? (
                  <Link to="habolabu/tao-bai-viet">
                    <Button variant="contained" startIcon={<AddIcon />} size="small">
                      Tạo bài viết
                    </Button>
                  </Link>
                ) : null}
              </CCardHeader>
              <CCardBody>
                <CRow className="mb-3">
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="text"
                      id="searchPostTitle"
                      floatingLabel="🔍 Tìm kiếm theo tên"
                      placeholder="Nhập tên..."
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                  </CCol>
                  <CCardText className="mt-4">Tìm kiếm theo ngày</CCardText>
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="date"
                      id="searchBeginDate"
                      floatingLabel="🔍 Ngày bắt đầu"
                      onChange={(e) => setSearchBeginDate(e.target.value)}
                    />
                  </CCol>
                  <CCol md={6} sm={12}>
                    <CFormInput
                      type="date"
                      id="searchEndDate"
                      floatingLabel="🔍 Ngày kết thúc"
                      onChange={(e) => setSearchEndDate(e.target.value)}
                    />
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* Post list */}
        {postList.totalPage > 0 ? (
          <CRow xs={{ gutter: 3 }}>
            {postList.data.map((postItem) => {
              return (
                <CCol xs={12} md={6} lg={4} key={postItem.id}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          Ad
                        </Avatar>
                      }
                      action={
                        <>
                          {permissionLocal.isExistPermission(PermissionDirection.MODIFY_EXIST_POST) ? (
                            <Link to={`chinh-sua/${postItem.slug}`}>
                              <MdEdit />
                            </Link>
                          ) : null}
                          {permissionLocal.isExistPermission(PermissionDirection.DELETE_EXIST_POST) ? (
                            <DeletePostModal slug={postItem.slug} submitDeletePostChange={getPostAll} />
                          ) : null}
                        </>
                      }
                      title={postItem.title}
                      subheader={postItem.createdAt.slice(0, 10)}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {postItem.content}
                      </Typography>
                    </CardContent>
                    <CardActions className="d-flex justify-content-between p-4">
                      <Link to={postItem.slug}>
                        <b>Đọc tiếp {'>>'}</b>
                      </Link>
                      <CNavLink className="mt-1">
                        <span>
                          <CIcon icon={cilMoodGood} size="xl" />
                          <CBadge color="info" className="badge-sm position-absolute start-90 translate-middle">
                            {postItem.totalEmotion}
                          </CBadge>
                        </span>
                        <span className="px-2">
                          <CIcon icon={cilCommentBubble} size="xl" />
                          <CBadge color="info" className="badge-sm position-absolute start-90 translate-middle">
                            {postItem.totalComment}
                          </CBadge>
                        </span>
                      </CNavLink>
                    </CardActions>
                  </Card>
                </CCol>
              );
            })}
            <CCol xs={12} className="d-flex justify-content-center mt-5">
              <Pagination count={postList.totalPage} color="primary" onChange={handlePageClick} />
            </CCol>
          </CRow>
        ) : (
          <CRow>
            <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
            <CCol sm={4}>
              <Skeleton variant="rectangular" height={118} />
              <Skeleton />
              <Skeleton width="60%" />
            </CCol>
            <CCol sm={4}>
              <Skeleton variant="rectangular" height={118} />
              <Skeleton />
              <Skeleton width="60%" />
            </CCol>
          </CRow>
        )}
      </CContainer>
    </Helmet>
  );
};

export default PostList;
