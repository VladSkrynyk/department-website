import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="text-center mt-4">
      <h1 className="text-2xl font-bold">Лічильник: {count}</h1>
      <div className="mt-4">
        <button
          onClick={() => dispatch(increment())}
          className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-700 mr-2"
        >
          Збільшити
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Зменшити
        </button>
      </div>
    </div>
  );
}

export default Counter;
