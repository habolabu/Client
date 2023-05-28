// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';
import { CFooter } from '@coreui/react';

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="fw-bold">Hệ thống quản lý chung cư {process.env.REACT_APP_BRAND_NAME}</span> @ 2022 -{' '}
        {new Date().getFullYear()}
      </div>
      <div className="ms-auto">
        <span className="me-1">Cung cấp bởi</span>
        <span className="fw-bold">{process.env.REACT_APP_BRAND_NAME}</span>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
