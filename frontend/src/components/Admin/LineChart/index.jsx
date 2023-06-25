import React, { useState, useEffect } from 'react';

import { Line } from '@ant-design/plots';

function  LineChart ()  {
  const data = [
    { Date: '01',scales: 19 },
    { Date: '02',scales: 29 },
    { Date: '03',scales: 18 },
    { Date: '04',scales: 11 },
    { Date: '05',scales: 32 },
    { Date: '06',scales: 24 },
    { Date: '07',scales: 36 },
  ];
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    height: 200,
    xAxis: {
      // type: 'timeCat',
      tickCount: 8,
    },
    color: '#fb9638',
    smooth: true,
    
    style: {
      stroke: '#fb9638'
    }
  };

  return (
          <Line {...config} />      
  ) 
};

export default LineChart;