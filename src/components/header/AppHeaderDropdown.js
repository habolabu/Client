import React from 'react';
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { cilBell, cilCreditCard, cilEnvelopeOpen, cilSettings, cilUser, cilArrowThickFromLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';

const AppHeaderDropdown = () => {
  let jwtDecodeAuth = jwt_decode(Cookies.get('habolabu'));
  return (
    <Tippy content="Cài đặt">
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar
            src="https://res.cloudinary.com/dzd9sonxs/image/upload/v1664544714/avatar/default-avatar_xh2rub.png"
            size="md"
          />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Thông tin</CDropdownHeader>
          <CDropdownItem href="#" onClick={() => toast.error('Chức năng chưa được phát triển', { theme: 'colored' })}>
            <CIcon icon={cilBell} className="me-2" />
            Thông báo
            <CBadge color="info" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#" onClick={() => toast.error('Chức năng chưa được phát triển', { theme: 'colored' })}>
            <CIcon icon={cilEnvelopeOpen} className="me-2" />
            Tin nhắn
            <CBadge color="success" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>

          <CDropdownHeader className="bg-light fw-semibold py-2">Thanh toán</CDropdownHeader>
          <Link to={`/${jwtDecodeAuth.role}/hoa-don`} className="dropdown-item">
            <CIcon icon={cilCreditCard} className="me-2" />
            Thanh toán
            <CBadge color="secondary" className="ms-2">
              2
            </CBadge>
          </Link>

          <CDropdownHeader className="bg-light fw-semibold py-2">Tài khoản</CDropdownHeader>
          <Link to={`/${jwtDecodeAuth.role}/thong-tin-ca-nhan`} className="dropdown-item">
            <CIcon icon={cilUser} className="me-2" />
            Thông tin cá nhân
          </Link>
          <Link to={`/${jwtDecodeAuth.role}/doi-mat-khau`} className="dropdown-item">
            <CIcon icon={cilSettings} className="me-2" />
            Đổi mật khẩu
          </Link>

          <CDropdownDivider />
          <Link to="/" className="dropdown-item" onClick={() => Cookies.remove('habolabu')}>
            <CIcon icon={cilArrowThickFromLeft} className="me-2" />
            Đăng xuất
          </Link>
        </CDropdownMenu>
      </CDropdown>
    </Tippy>
  );
};

export default AppHeaderDropdown;
