import React from "react";
import { ACTIONS } from "../App";
const DigitButton = ({ dispatch, digit }) => {
  return (
    <button
    className="text-2xl font-bold rounded-full bg-lime-200 p-2 text-black"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
