import React from 'react';
import * as Sc from './styled';

const Responsive = ({ children, className, ...rest }) => {
  return (
    <Sc.Container {...rest} className={className}>
      {children}
    </Sc.Container>
  );
};

export default Responsive;
