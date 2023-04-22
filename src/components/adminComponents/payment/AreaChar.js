/* eslint-disable no-loop-func */
// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import billServices from 'src/api/paymentServices/billServices';
import { toast } from 'react-toastify';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CRow } from '@coreui/react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const AreaChart = ({ month, year }) => {
  // set data line chart
  const [dataLineChar, setDataLineChar] = useState({
    labels: [],
    datasets: [
      {
        fill: true,
        label: '',
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

  function randomRGB() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    return 'rgb(' + x + ',' + y + ',' + z + ')';
  }

  const getStatisticBill = async () => {
    try {
      const labelLineChartSet = Array.from({ length: 31 }, (_, i) => i + 1);
      let dataLineChartSet = [];
      const datasets = [];
      let dataItem = {};
      let color;
      const params = {
        fromMonth: month,
        toMonth: month,
        fromYear: year,
        toYear: year,
      };
      const res = await billServices.statistics(params);
      if (res && res.data) {
        // set line chart
        color = `${randomRGB()}`;
        for (const [key, value] of Object.entries(res.data.response.body.detail)) {
          dataItem.fill = true;
          dataItem.label = key;
          dataItem.backgroundColor = color;
          dataItem.borderColor = color;
          value.forEach((item) => {
            dataLineChartSet.push(item.revenue);
          });
          dataItem.data = dataLineChartSet;
          dataLineChartSet = [];
          datasets.push(dataItem);
          dataItem = {};
        }
        setDataLineChar({
          labels: labelLineChartSet,
          datasets: datasets,
        });
      } else {
        toast.error(
          'Thất bại khi lấy thống kê hoá đơn. Vui lòng kiểm tra dữ liệu đầu vào !!! ' + res.response.message,
          {
            theme: 'colored',
          },
        );
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
  }, [month, year]);

  return (
    <CRow>
      <Line options={optionsLineChart} data={dataLineChar} height={100} />
    </CRow>
  );
};

export default AreaChart;
