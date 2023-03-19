import React from 'react';
import Page403 from 'src/views/pages/auth/Page403';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';

import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const AdminLayout = () => {
  let jwtDecodeAuth = jwt_decode(Cookies.get('habolabu'));

  return (
    <>
      {jwtDecodeAuth.role === 'quan-tri-vien' ? (
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
