// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CImage,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';

import { AppBreadcrumb } from '../../index';
import { AppHeaderDropdown } from '../../header/index';
import Tippy from '@tippyjs/react';
import Lottie from 'react-lottie-player';
import cityHall from '../../../assets/lottie/city-hall.json';
import chat from '../../../assets/lottie/chat.json';

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        {/* logo homepage mobile */}
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CImage
            className="sidebar-brand-full"
            src="https://res.cloudinary.com/dzd9sonxs/image/upload/v1666776349/logo/ou_logo_e0ex9z.svg"
            height={45}
          />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto align-items-center">
          <Lottie loop animationData={cityHall} play style={{ width: 40, height: 40 }} />
          <p style={{ margin: 0 }}>Hệ thống chung cư - {process.env.REACT_APP_BRAND_NAME.toUpperCase()}</p>
        </CHeaderNav>
        <CHeaderNav>
          {/* message */}
          <CNavItem>
            <Tippy content="Tin nhắn">
              <CNavLink href={process.env.REACT_APP_ROOMCHAT_URL} target="_blank">
                <Lottie loop animationData={chat} play style={{ width: 40, height: 40 }} />
              </CNavLink>
            </Tippy>
          </CNavItem>
        </CHeaderNav>
        {/* dropdown avatar */}
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
