/* eslint-disable react-hooks/exhaustive-deps */
// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';

import { AppSidebarNav } from '../AppSidebarNav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import navigation from '../../../route/_navAdmin';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const params = useLocation();

  useEffect(() => {
    if (params.pathname.includes('/habolabu/trang-tong-quan')) {
      dispatch({ type: 'set', sidebarShow: false });
    } else {
      dispatch({ type: 'set', sidebarShow: true });
    }
  }, [params.pathname]);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <CImage
          className="sidebar-brand-full"
          src="https://res.cloudinary.com/dzd9sonxs/image/upload/v1666776349/logo/ou_logo_e0ex9z.svg"
          height={45}
        />
        <CImage
          className="sidebar-brand-narrow"
          src="https://res.cloudinary.com/dzd9sonxs/image/upload/v1666776349/logo/ou_logo_e0ex9z.svg"
          height={45}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
