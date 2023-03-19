import React from 'react';
import { AppContentClient, AppSidebarClient, AppFooter, AppHeaderClient } from '../components/index';
import Page403 from 'src/views/pages/auth/Page403';

import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const ClientLayout = () => {
  let jwtDecodeAuth = jwt_decode(Cookies.get('habolabu'));

  return (
    <>
      {jwtDecodeAuth.role === 'nguoi-dung-thuong' ? (
        <>
          <AppSidebarClient />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeaderClient />
            <div className="body flex-grow-1 px-3">
              <AppContentClient />
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

export default ClientLayout;
