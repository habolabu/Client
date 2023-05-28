// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import billServices from 'src/api/paymentServices/billServices';
import { toast } from 'react-toastify';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Filler, Tooltip, Legend);

const LineChart = () => {
  // searching
  const dateNow = new Date().getFullYear();
  const optionsMonth = [];
  const optionsYear = [];
  for (let i = 1; i <= 12; i++) {
    optionsMonth.push({ value: `${i}`, text: `Tháng ${i}` });
  }
  for (let i = 2016; i <= dateNow; i++) {
    optionsYear.push({ value: `${i}`, text: `Năm ${i}` });
  }
  const [activeMonthButton, setActiveMonthButton] = useState(null);
  const [activeYearButton, setActiveYearButton] = useState(null);
  // searching
  const [fromMonth, setFromMonth] = useState(optionsMonth[0].value);
  const [toMonth, setToMonth] = useState(optionsMonth[optionsMonth.length - 1].value);
  const [fromYear, setFromYear] = useState(dateNow);
  const [toYear, setToYear] = useState(dateNow);
  const [labelStats, setLabelStats] = useState(null);
  const [dataChartDetails, setDataChartDetails] = useState(null);

  const handleChangeFromMonth = (event) => {
    setFromMonth(event.target.value);
  };
  const handleChangeFromYear = (event) => {
    setFromYear(event.target.value);
  };
  const handleChangeToMonth = (event) => {
    setToMonth(event.target.value);
  };
  const handleChangeToYear = (event) => {
    setToYear(event.target.value);
  };

  // set data line chart
  const [dataLineChar, setDataLineChar] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
      },
    ],
  });
  const optionsLineChart = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê doanh thu theo tháng',
      },
    },
  };

  const randomRGB = () => {
    return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256,
    )})`;
  };

  const getStatisticBill = async () => {
    try {
      let dataAverageSet = [];
      let dataMaxSet = [];
      let dataSumSet = [];
      let labelTitles = [];
      let labelStatsTitle = [];

      const params = {
        fromMonth: fromMonth,
        toMonth: toMonth,
        fromYear: fromYear,
        toYear: toYear,
      };
      const res = await billServices.statistics(params);
      if (res && res.data) {
        // set line chart
        for (const [key, value] of Object.entries(res.data.response.body.summarize)) {
          let obj = {};
          let objValue = [];
          for (const [key1, value1] of Object.entries(value)) {
            labelTitles.push(`Tháng ${Object.keys(value1)[0]} năm ${key}`);
            for (const [key2, value2] of Object.entries(value1)) {
              dataAverageSet.push(value2.average);
              dataMaxSet.push(value2.max);
              dataSumSet.push(value2.sum);
            }
          }
          obj[key] = objValue;
          labelStatsTitle.push(obj);
        }
        setDataChartDetails(res.data.response.body.detail);
        setDataLineChar({
          labels: labelTitles,
          datasets: [
            {
              label: 'Doanh thu trung bình mỗi tháng',
              data: dataAverageSet,
              borderColor: `${randomRGB()}`,
              backgroundColor: `${randomRGB()}`,
            },
            {
              label: 'Doanh thu cao nhất mỗi tháng',
              data: dataMaxSet,
              borderColor: `${randomRGB()}`,
              backgroundColor: `${randomRGB()}`,
            },
            {
              label: 'Doanh thu tổng mỗi tháng',
              data: dataSumSet,
              borderColor: `${randomRGB()}`,
              backgroundColor: `${randomRGB()}`,
            },
          ],
        });
        setLabelStats(labelStatsTitle);
      } else {
        toast.error('Thất bại khi lấy thống kê hoá đơn. Vui lòng kiểm tra dữ liệu đầu vào !!! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy thống kê hoá đơn: ', error);
      toast.error('Thất bại khi lấy thống kê hoá đơn. Vui lòng kiểm tra dữ liệu đầu vào !!! ' + error.message, {
        theme: 'colored',
      });
    }
  };
  useEffect(() => {
    const callApiStatistic = setTimeout(() => {
      getStatisticBill();
    }, 500);
    return () => {
      clearTimeout(callApiStatistic);
    };
  }, [fromMonth, toMonth, fromYear, toYear]);

  const [month, setMonth] = useState(null);
  const renderMonth = (months) => {
    setMonth(months);
  };

  function handleYear(data) {
    const handleClick = (year) => {
      setActiveMonthButton(null);
      setActiveYearButton(year);
      renderMonth(data[year]);
    };

    let year = [];
    for (const [key, value] of Object.entries(data)) {
      year.push(key);
    }

    return (
      <>
        <p>
          <b>Chọn năm thống kê:</b>
        </p>
        {year.map((year, i) => {
          const isActive = activeYearButton === year;
          return (
            <CCol key={i} md={2} sm={4} xs={6} className="my-2">
              <CButton color={isActive ? 'success' : 'info'} onClick={() => handleClick(year)} className="full-width">
                {year}
              </CButton>
            </CCol>
          );
        })}
      </>
    );
  }

  const [chartMonthDetail, setChartMonthDetail] = useState(null);
  function renderChartDetails(dataMonth) {
    let dataRs = [];

    for (const [key, value] of Object.entries(dataMonth)) {
      for (const [key2, value2] of Object.entries(value)) {
        dataRs.push(value2.revenue);
      }
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Thống kê doanh thu theo tháng',
        },
      },
    };

    const areaData = {
      labels: Array.from({ length: dataRs.length }, (_, i) => i + 1),
      datasets: [
        {
          fill: true,
          label: 'Doanh thu chi tiết theo tháng',
          data: dataRs,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
    setChartMonthDetail(areaData);
    return <Line options={options} data={areaData} height={100} />;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê doanh thu theo tháng',
      },
    },
  };

  function handleMonth(data) {
    const handleClick = (month) => {
      setActiveMonthButton(month);
      renderChartDetails(data[parseInt(month) - minMonth]);
    };
    let month = [];
    let minMonth;
    for (const [key, value] of Object.entries(data)) {
      month.push(Object.keys(value)[0]);
    }

    minMonth = month[0];

    return (
      <>
        <p>
          <b>Chọn tháng thống kê:</b>
        </p>
        {month.map((month, i) => {
          const isActive = activeMonthButton === month;
          return (
            <CCol key={i} md={2} sm={4} xs={6} className="my-2">
              <CButton
                className="full-width"
                color={isActive ? 'success' : 'info'}
                onClick={() => handleClick(month)}
              >{`Tháng ${month}`}</CButton>
            </CCol>
          );
        })}
      </>
    );
  }

  return (
    <CRow>
      <CRow>
        <CCol md={6} sm={12}>
          <CRow>
            <CCol md={4} xs={12}>
              <CFormLabel htmlFor="fromMonth" className="col-form-label">
                <b>Tháng bắt đầu</b>
              </CFormLabel>
            </CCol>
            <CCol md={8} sm={12}>
              <CFormSelect value={fromMonth} onChange={handleChangeFromMonth}>
                {optionsMonth.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol md={6} sm={12}>
          <CRow>
            <CCol lg={3} md={4} xs={12}>
              <CFormLabel htmlFor="fromYear" className="col-form-label">
                <b>Năm bắt đầu</b>
              </CFormLabel>
            </CCol>
            <CCol md={8} sm={12}>
              <CFormSelect value={fromYear} onChange={handleChangeFromYear}>
                {optionsYear.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-5">
        <CCol md={6} sm={12}>
          <CRow>
            <CCol md={4} xs={12}>
              <CFormLabel htmlFor="toMonth" className="col-form-label">
                <b>Tháng kết thúc</b>
              </CFormLabel>
            </CCol>
            <CCol md={8} sm={12}>
              <CFormSelect value={toMonth} onChange={handleChangeToMonth}>
                {optionsMonth.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol md={6} sm={12}>
          <CRow>
            <CCol lg={3} md={4} xs={12}>
              <CFormLabel htmlFor="toYear" className="col-form-label">
                <b>Năm kết thúc</b>
              </CFormLabel>
            </CCol>
            <CCol md={8} sm={12}>
              <CFormSelect value={toYear} onChange={handleChangeToYear}>
                {optionsYear.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <Line options={optionsLineChart} data={dataLineChar} height={100} />
      <CRow className="mt-4">{dataChartDetails ? handleYear(dataChartDetails) : null}</CRow>
      <CRow className="mt-4">{month ? handleMonth(month) : null}</CRow>
      <CRow className="mt-4">
        {chartMonthDetail ? <Line options={options} data={chartMonthDetail} height={100} /> : null}
      </CRow>
    </CRow>
  );
};

export default LineChart;
