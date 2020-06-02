import React from 'react';

const PageTemplate = ({ header, children }) => {
  return (
    <div>
      {header}
      <main>{children}</main>
    </div>
  );
};

export default PageTemplate;
