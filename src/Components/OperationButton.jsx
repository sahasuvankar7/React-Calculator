import React from "react";
import { ACTIONS } from "../App";

const OperationButton = ({ dispatch, operation }) => {
  return (
    <button
      className="text-2xl font-bold rounded-full bg-red-400 text-gray-700"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
};

export default OperationButton;
