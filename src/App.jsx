import React, { useReducer } from "react";
import DigitButton from "./Components/DigitButton";
import OperationButton from "./Components/OperationButton";
// so make global action object so that we can access it easily
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (state.currentOperand === "0" && payload.digit === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state, // returning new state . principle of reducer
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.prevOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state, // returning new state . principle of reducer
          operation: payload.operation,
        };
      }
      if (state.prevOperand == null) {
        return {
          ...state, // returning new state . principle of reducer
          operation: payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.prevOperand == null ||
        state.currentOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        prevOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand == null) return state;
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: null };
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.CLEAR:
      return {};
  }
}

const evaluate = ({ currentOperand, prevOperand, operation }) => {
  const current = parseFloat(currentOperand);
  const prev = parseFloat(prevOperand);
  if (isNaN(prev) || isNaN(current)) {
    return "";
  }

  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "%":
      computation = parseFloat(prev % current);
      break;
  }
  return computation.toString();
};

const INTEGER_FORMATER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(Operand) {
  if (Operand == null) return;
  const [integer, decimal] = Operand.split(".");
  if (decimal == null) return INTEGER_FORMATER.format(integer);
  return `${INTEGER_FORMATER.format(integer)}.${decimal}`;
}
const App = () => {
  // const [state, dispatch] = useReducer(reducer,{})
  // this is our main component in here instead of writing state variables we can simply use
  // prevoperand and currentoperand, operator and clear
  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-md shadow-md">
    <div className="mb-6 px-4 py-4 mt-3 h-20 rounded-lg border-2 border-solid border-gray-300">
      <div className="text-white text-right text-base font-bold">
        {formatOperand(prevOperand)}
        {operation}
      </div>
      <div className="text-white text-right text-2xl font-bold mb-2">
        {formatOperand(currentOperand)}
      </div>
    </div>
  
    <div className="grid grid-cols-4 gap-3 mb-4">
      <button
        className="col-span-2 sm:col-span-1 bg-gray-300 text-gray-700 p-2 rounded-md text-xl hover:bg-gray-400 transition"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <OperationButton dispatch={dispatch} operation="%"  />
      <button
        className="col-span-2 sm:col-span-1 bg-gray-300 text-gray-700 p-2 rounded-md text-2xl hover:bg-gray-400 transition"
        onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
      >
        DEL
      </button>
      <OperationButton dispatch={dispatch} operation="÷" />
    </div>
  
    <div className="grid grid-cols-4 gap-3 mb-4">
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton dispatch={dispatch} operation="*" />
    </div>
  
    <div className="grid grid-cols-4 gap-3 mb-4">
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton dispatch={dispatch} operation="-" />
    </div>
  
    <div className="grid grid-cols-4 gap-3 mb-4">
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton dispatch={dispatch} operation="+" />
    </div>
  
    <div className="grid grid-cols-4 gap-3 mb-4">
      <button
        className="col-span-2 sm:col-span-1 bg-gray-300 text-gray-700 p-3 rounded-md text-2xl hover:bg-gray-400 transition"
        onClick={() => dispatch({ type: ACTIONS.ZERO })}
      >
        0
      </button>
      <DigitButton digit="." dispatch={dispatch} />
      <button
        className="col-span-2 sm:col-span-1 bg-blue-500 text-white p-3 rounded-md text-2xl hover:bg-blue-600 transition"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  </div>
  
  
  
  
  
  
  
  
  );
};

export default App;
