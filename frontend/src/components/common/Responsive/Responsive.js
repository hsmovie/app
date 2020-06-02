import React from 'react';
import * as Sc from './styled';

const Responsive = ({ children, ...rest }) => {
  return <div {...rest}>children</div>;
};

export default Responsive;
