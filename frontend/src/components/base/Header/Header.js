import React from 'react';
import * as Sc from './styled';

const Header = () => {
  return (
    <Sc.Header>
      <div className="header-wrapper">
        <div className="brand">etf</div>
        <nav>
          <a className="active" href="/">
            Link
          </a>
          <a href="/">Link</a>
          <a href="/">Link</a>
          <a href="/">Link</a>
        </nav>
        <div>right side</div>
      </div>
    </Sc.Header>
  );
};

export default Header;
