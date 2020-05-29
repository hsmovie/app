import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 50px;
  background: #e5e5e5;
`;

const Counter = ({ onIncrease, onDecrease, number }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <Button onClick={onIncrease}>+1</Button>
        <Button onClick={onDecrease}>-1</Button>
      </div>
    </div>
  );
};

export default Counter;
