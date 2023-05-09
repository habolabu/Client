// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';
// sidebar nav config
import navigation from '../../route/_navBlocksServices';
import { CCol, CRow } from '@coreui/react';

const BlocksServices = () => {
  console.log(navigation);
  return (
    <CRow className="blocks-services">
      {navigation.map((item, index) => {
        return (
          <CCol xs={6} md={4} key={index} className="my-2">
            <div className="card card-5">
              <div className="card__icon">📑</div>
              <div className="text">{item.name}</div>
            </div>
          </CCol>
        );
      })}
    </CRow>
  );
};

export default BlocksServices;
