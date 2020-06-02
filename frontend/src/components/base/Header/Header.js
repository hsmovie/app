import React from 'react';
import Responsive from '../../common/Responsive';
import * as Sc from './styled';

const Header = () => {
  return (
    <Sc.Header>
      <Responsive className="header-wrapper">
        <div className="brand">etf</div>
        <nav>
          <a className="active" href="/">
            Link
          </a>
          <a href="/">Link</a>
          <a href="/">Link</a>
          <a href="/">Link</a>
        </nav>
        <div className="right">right side</div>
      </Responsive>
    </Sc.Header>
  );
};

export default Header;
