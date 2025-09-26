import { createContext, ReactNode, useReducer } from "react";
import { FavoriteItem } from "../data/Cart";

type FavoriteState = {
  items: FavoriteItem[];
};
type FavoriteAction = {
  type: "ADD" | "REMOVE";
  payload: FavoriteItem;
};

type FavoriteContextType = {
  state: FavoriteState;
  dispatch: null | React.Dispatch<FavoriteAction>;
};
const storedCart = localStorage.getItem("favorite");

let initialFavoriteState: FavoriteState;

if (storedCart === null) {
  initialFavoriteState = { items: [] };
} else {
  initialFavoriteState = JSON.parse(storedCart);
}

export const FavoriteContext = createContext<FavoriteContextType>({
  dispatch: null,
  state: {
    items: [],
  },
});

const favoriteReducer = (
  state: FavoriteState,
  action: FavoriteAction
): FavoriteState => {
  switch (action.type) {
    case "ADD":
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex < 0) {
        state.items.push(action.payload);
      }
      localStorage.setItem("favorite", JSON.stringify(state));
      return state;
    case "REMOVE":
      const res = {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
      localStorage.setItem("favorite", JSON.stringify(res));
      return res;
    default:
      throw new Error();
  }
};

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoriteReducer, initialFavoriteState);

  return (
    <FavoriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
};
