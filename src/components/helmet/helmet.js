import React from 'react';
import PropTypes from 'prop-types';

const Helmet = (props) => {
  document.title = `Habolabu ${props.role} - ${props.title}`;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>{props.children}</div>;
};

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Helmet;
