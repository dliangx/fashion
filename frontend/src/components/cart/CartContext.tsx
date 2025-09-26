import { createContext, ReactNode, useReducer, useState } from "react";
import { CartItem } from "../data/Cart";

type CartState = {
  items: CartItem[];
};
type CartAction = {
  type: "ADD" | "MINUS" | "REMOVE" | "REMOVE_ALL";
  payload: CartItem;
};

type CartContextType = {
  state: CartState;
  dispatch: null | React.Dispatch<CartAction>;
  cartIndex: number;
  setCartIndex: any;
};

const storedCart = localStorage.getItem("cart");

let initialCartState: CartState;

if (storedCart === null) {
  initialCartState = { items: [] };
} else {
  initialCartState = JSON.parse(storedCart);
}

export const CartContext = createContext<CartContextType>({
  dispatch: null,
  state: {
    items: [],
  },
  cartIndex: 0,
  setCartIndex: null,
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD":
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        const cart_res = {
          items: state.items.map((item, index) =>
            index === itemIndex ? { ...item, num: item.num + 1 } : item
          ),
        };
        localStorage.setItem("cart", JSON.stringify(cart_res));
        return cart_res;
      } else {
        const cart_res = {
          items: [...state.items, { ...action.payload, num: 1 }],
        };
        localStorage.setItem("cart", JSON.stringify(cart_res));
        return cart_res;
      }
    case "MINUS":
      const itemIndex2 = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex2 >= 0) {
        const cart_res = {
          items: state.items.map((item, index) =>
            index === itemIndex2
              ? { ...item, num: item.num - 1 >= 1 ? item.num - 1 : 1 }
              : item
          ),
        };
        localStorage.setItem("cart", JSON.stringify(cart_res));
        return cart_res;
      }
      return { items: state.items };
    case "REMOVE":
      const cart_res = {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
      localStorage.setItem("cart", JSON.stringify(cart_res));
      return cart_res;
    case "REMOVE_ALL":
      const cart_empty = { items: [] };
      localStorage.setItem("cart", JSON.stringify(cart_empty));
      return cart_empty;
    default:
      throw new Error();
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [cartIndex, setCartIndex] = useState(0);
  return (
    <CartContext.Provider value={{ state, dispatch, cartIndex, setCartIndex }}>
      {children}
    </CartContext.Provider>
  );
};
