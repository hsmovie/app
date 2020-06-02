import React from 'react';
import Responsive from '../../common/Responsive';
import * as Sc from './styled';

const HomeTemplate = () => {
  return (
    <Sc.Container>
      <Responsive className="block">
        <div className="left-text">
          <div>
            <h1>ETF를 위한 공부를 시작하세욧!</h1>
            <div className="description">
              <p>바아 ~로 여기서 금융문맹을 탈출하여</p>
              <p>부자가 되어보세욧!</p>
            </div>
          </div>
        </div>
        <div className="right-form">
          <div className="black-box">저는 어쩌고이고 어쩌고인데~</div>
          <div className="register-button">지금 시작하기</div>
        </div>
      </Responsive>
    </Sc.Container>
  );
};

export default HomeTemplate;
