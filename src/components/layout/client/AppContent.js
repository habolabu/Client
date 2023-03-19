import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';

// routes config
import { clientRoutes } from '../../../route/routes';

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {clientRoutes.map((route, idx) => {
            return route.element && <Route key={idx} path={route.path} name={route.name} element={<route.element />} />;
          })}
          <Route path="/client/dashboard" element={<Navigate to="dashboard" />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
