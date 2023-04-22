// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './scss/style.scss';
import 'tippy.js/dist/tippy.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
// Containers
const AdminLayout = React.lazy(() => import('./layout/AdminLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/auth/Login'));
const Page404 = React.lazy(() => import('./views/pages/auth/Page404'));

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" name="LoginPage" element={<Login />} />
            <Route path="/habolabu/*" name="AdminDashboard" element={<AdminLayout />} />
            <Route path="*" name="404" element={<Page404 />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
