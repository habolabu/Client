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
    <Helmet title="Tổng quan" role="Admin">
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>📈 Thống kê</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol sm={11}>
                  <CRow>
                    <CCol lg={2} md={4} xs={12}>
                      <CFormLabel htmlFor="floorNumber" className="col-form-label">
                        <b>Chọn loại thống kê</b>
                      </CFormLabel>
                    </CCol>
                    <CCol md={8} sm={12}>
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