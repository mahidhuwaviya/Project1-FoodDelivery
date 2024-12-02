import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return [
        ...state,
        {
          id: action.id,
          data: action.data,
          quantity: action.quantity,
          size: action.size,
          finalPrice: action.finalPrice,
        },
      ];

    case "Remove":
      return state.filter((item, index) => index !== action.index);

    case "Update":
      return state.map((food) =>
        food.id === action.id && food.size === action.size
          ? {
              ...food,
              quantity: parseInt(action.quantity) + food.quantity,
              finalPrice: action.finalPrice + food.finalPrice,
            }
          : food
      );
    case "Drop":
      return [];

    default:
      console.log("Error in reducer");
      return state;
  }
};
export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}{" "}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
