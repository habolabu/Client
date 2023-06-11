// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React, { useState, useEffect } from 'react';
import { CAvatar, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { cilCreditCard, cilSettings, cilUser, cilArrowThickFromLeft, cilChatBubble } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Tippy from '@tippyjs/react';
import avatarServices from 'src/api/humanServices/avatarServices';
import { encryptData } from 'src/utils/encryptData';

const AppHeaderDropdown = () => {
  let brandName = process.env.REACT_APP_BRAND_NAME;
  let roomChat = process.env.REACT_APP_ROOMCHAT_URL;

  const [avatarUser, setAvatarUser] = useState(null);

  const getAvatarUser = async () => {
    try {
      const res = await avatarServices.getLogoCurrentUser();
      if (res && res.data) {
        setAvatarUser(res.data.response.body.avatar);
      } else {
        console.log('Thất bại khi lấy avatar tài khoản: ');
      }
    } catch (error) {
      console.log('Thất bại khi lấy avatar tài khoản: ', error);
    }
  };
  useEffect(() => {
    getAvatarUser();
  }, []);

  return (
    <Tippy content="Cài đặt">
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          {avatarUser ? (
            <CAvatar src={avatarUser} size="md" />
          ) : (
            <CAvatar
              src="https://res.cloudinary.com/dzd9sonxs/image/upload/v1664544714/avatar/default-avatar_xh2rub.png"
              size="md"
            />
          )}
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Thông tin</CDropdownHeader>
          <Link to={`${roomChat}`} target="_blank" className="dropdown-item">
            <CIcon icon={cilChatBubble} className="me-2" />
            Tin nhắn
          </Link>

          <CDropdownHeader className="bg-light fw-semibold py-2">Thanh toán</CDropdownHeader>
          <Link to={`/${brandName}/hoa-don`} className="dropdown-item">
            <CIcon icon={cilCreditCard} className="me-2" />
            Thanh toán
          </Link>

          <CDropdownHeader className="bg-light fw-semibold py-2">Tài khoản</CDropdownHeader>
          <Link to={`/${brandName}/thong-tin-ca-nhan`} className="dropdown-item">
            <CIcon icon={cilUser} className="me-2" />
            Thông tin cá nhân
          </Link>
          {/* <Link to={`/${brandName}/doi-mat-khau`} className="dropdown-item">
            <CIcon icon={cilSettings} className="me-2" />
            Đổi mật khẩu
          </Link> */}

          <CDropdownDivider />
          <Link
            to="/"
            className="dropdown-item"
            onClick={() => {
              Cookies.remove('access_token');
              Cookies.remove('refresh_token');
              encryptData.clearData();
            }}
          >
            <CIcon icon={cilArrowThickFromLeft} className="me-2" />
            Đăng xuất
          </Link>
        </CDropdownMenu>
      </CDropdown>
    </Tippy>
  );
};

export default AppHeaderDropdown;
