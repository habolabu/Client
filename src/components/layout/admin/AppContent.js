// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';

// routes config
import { routes } from '../../../route/routes';

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return route.element && <Route key={idx} path={route.path} name={route.name} element={<route.element />} />;
          })}
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
