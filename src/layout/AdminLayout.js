// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';
import Page403 from 'src/views/pages/auth/Page403';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';

import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const AdminLayout = () => {
  let jwtDecodeAuth = '';
  if (document.cookie.includes('access_token')) {
    jwtDecodeAuth = jwt_decode(Cookies.get('access_token'));
  } else {
    console.log(0);
  }

  return (
    <>
      {jwtDecodeAuth.resource_access.account.roles.length > 0 ? (
        <>
          <AppSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <div className="body flex-grow-1 px-3">
              <AppContent />
            </div>
            <AppFooter />
          </div>
        </>
      ) : (
        <Page403 />
      )}
    </>
  );
};

export default AdminLayout;
