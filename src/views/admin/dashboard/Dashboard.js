// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

import { CCard, CCardBody, CCardHeader, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react';
import Helmet from 'src/components/helmet/helmet';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import LineChart from 'src/components/adminComponents/payment/LineChart';
import AreaChart from 'src/components/adminComponents/payment/AreaChar';
import Clock from 'src/components/utilComponents/Clock';
import BlocksServices from 'src/components/utilComponents/BlocksServices';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // select Statistic
  const optionsStatistic = [
    { value: 'statisticAll', text: 'Thống kê theo khoảng thời gian' },
    { value: 'statisticDetail', text: 'Thống kê theo tháng' },
  ];
  const [selectStatistic, setSelectStatistic] = useState(optionsStatistic[0].value);

  const handleChangeStatistic = (event) => {
    setSelectStatistic(event.target.value);
  };

  return (
    <Helmet title="Tổng quan">
      <CRow className="mb-4">
        <CCol xs={12} lg={5}>
          <Clock />
        </CCol>
        <CCol xs={12} lg={7}>
          <BlocksServices />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>📈 Thống kê</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol sm={12}>
                  <CRow>
                    <CCol lg={2} md={4} xs={12}>
                      <CFormLabel htmlFor="floorNumber" className="col-form-label">
                        <b>Chọn loại thống kê</b>
                      </CFormLabel>
                    </CCol>
                    <CCol lg={4} md={8} sm={12}>
                      <CFormSelect value={selectStatistic} onChange={handleChangeStatistic}>
                        {optionsStatistic.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              {selectStatistic === 'statisticAll' ? <LineChart /> : <AreaChart />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </Helmet>
  );
};

export default Dashboard;
