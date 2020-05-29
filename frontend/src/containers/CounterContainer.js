import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { INCREMENT, DECREMENT } from '../modules/counter';

const CounterContainer = () => {
  const counter = useSelector((state) => state.counter);
  console.log();
  const dispatch = useDispatch();
  return (
    <Counter
      onIncrease={() => dispatch({ type: INCREMENT })}
      onDecrease={() => dispatch({ type: DECREMENT })}
      number={counter}
    />
  );
};

export default CounterContainer;
