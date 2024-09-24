'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { counter } from 'store';

export const Counter = () => {
  const count = useAppSelector(counter.selector.value);
  const dispatch = useAppDispatch();
  const increment = () => dispatch(counter.actions.increment());
  const reset = () => dispatch(counter.actions.reset());

  const incrementEven = () => dispatch(counter.customActions.incrementEven(2));
  const incrementByAmount = (amount: number) =>
    dispatch(counter.actions.incrementByAmount(amount));

  const [nurbek, setNurbek] = useState(0);
  useEffect(() => {
    console.log('CALL ONE TIME', nurbek, count);
  }, [nurbek, count]);

  return (
    <div>
      <button onClick={increment}>Counter {count}</button>
      <button onClick={reset}>Reset</button>
      <button onClick={incrementEven}>incrementEven</button>
      <button onClick={() => incrementByAmount(10)}>incrementByAmount</button>
      <br />
      <button
        onClick={() => {
          setNurbek(1);
          increment();
        }}
      >
        One click to change 2 depencies
      </button>
    </div>
  );
};
