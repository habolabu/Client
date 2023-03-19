import React from 'react';

import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import Helmet from 'src/components/helmet/helmet';

const Dashboard = () => {
  return (
    <Helmet title="Trang chủ" role="Client">
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Trang khách hàng
              </h4>
              <div className="small text-medium-emphasis">Trường Đại học Mở Tp.HCM</div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </Helmet>
  );
};

export default Dashboard;
