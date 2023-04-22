// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React from 'react';
import PropTypes from 'prop-types';

const Helmet = (props) => {
  document.title = `Habolabu ${props.role !== undefined ? props.role : ''} - ${props.title}`;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>{props.children}</div>;
};

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
  role: PropTypes.string,
  children: PropTypes.node,
};

export default Helmet;
