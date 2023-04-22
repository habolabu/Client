// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react';

import priceTagServices from 'src/api/buildingServices/priceTagServices';

import { toast } from 'react-toastify';
import numberWithCommas from 'src/utils/numberWithCommas';
import { BiSearchAlt } from 'react-icons/bi';
import Tippy from '@tippyjs/react';

const DetailsPriceTagModal = ({ slug }) => {
  const [visibleDetailsPriceTag, setVisibleDetailsPriceTag] = useState(false);
  const [priceTagInfo, setPriceTagInfo] = useState('');

  useEffect(() => {
    // get price tags
    const getPriceTag = async () => {
      try {
        const res = await priceTagServices.getPriceTagDetails(slug);
        if (res && res.data) {
          setPriceTagInfo(res.data.response.body);
        } else {
          toast.error('Thất bại khi lấy danh sách giá cả ! ', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thất bại khi lấy danh sách giá cả: ', error);
        toast.error('Thất bại khi lấy danh sách giá cả ! ', { theme: 'colored' });
      }
    };

    getPriceTag();
  }, [slug]);

  return (
    <>
      <Tippy content="Xem chi tiết">
        <CButton size="sm" color="info" onClick={() => setVisibleDetailsPriceTag(!visibleDetailsPriceTag)}>
          <BiSearchAlt />
        </CButton>
      </Tippy>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visibleDetailsPriceTag}
        onClose={() => setVisibleDetailsPriceTag(false)}
      >
        <CModalHeader>
          <CModalTitle>Thông tin giá</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="align-items-center justify-content-center">
            <CCol sm={11}>
              <CFormLabel htmlFor="name" className="col-sm-12 col-form-label">
                <b>
                  Tên giá<span className="text-danger">*</span>
                </b>
              </CFormLabel>
              <CFormInput type="text" id="name" name="name" value={priceTagInfo.name} disabled />
            </CCol>
            <CCol sm={11}>
              <CFormLabel htmlFor="pricePerDay" className="col-sm-12 col-form-label">
                <b>
                  Giá <span className="text-danger">*</span>
                </b>
              </CFormLabel>
              <CFormInput
                type="text"
                id="pricePerDay"
                name="pricePerDay"
                value={
                  priceTagInfo.pricePerDay
                    ? numberWithCommas(priceTagInfo.pricePerDay).toString() + ' vnđ'
                    : 'Chưa cập nhật'
                }
                disabled
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDetailsPriceTag(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DetailsPriceTagModal;
