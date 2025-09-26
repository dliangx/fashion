import { useContext, useEffect, useState } from "react";
import { ProductInfo } from "../data/Product";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Heart } from "../common/Icon";
import { FavoriteContext } from "../cart/FavoriteContext";

const ProductGrid = (props: ProductInfo) => {
  const { setTabIndex } = useContext(AppContext);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const itemIndex = state.items.findIndex((item) => item.id === props.id);
  useEffect(() => {
    setIsFavorite(itemIndex >= 0 ? true : false);
  }, []);

  return (
    <div className="grid  m-2">
      <div className="relative">
        <img
          src={props.pic}
          alt={props.name}
          onClick={() => {
            setTabIndex(3);
            navigate("/product/" + props.id.toString());
          }}
        />

        <Heart
          className="absolute right-2 bottom-2 h-4 "
          color="#ff4700"
          fill={isFavorite ? "#ff4700" : "none"}
          onClick={() => {
            if (localStorage.getItem("user_token") == undefined) {
              navigate("/login");

              return;
            }
            if (itemIndex >= 0) {
              dispatch != null &&
                dispatch({
                  type: "REMOVE",
                  payload: {
                    id: props.id,
                    pic: props.pic,
                    brand: props.brand,
                    name: props.name,
                    price: props.price,
                  },
                });
              setIsFavorite(false);
            } else {
              dispatch != null &&
                dispatch({
                  type: "ADD",
                  payload: {
                    id: props.id,
                    pic: props.pic,
                    brand: props.brand,
                    name: props.name,
                    price: props.price,
                  },
                });
              setIsFavorite(true);
            }
          }}
        />
      </div>
      <div className="font-serif text-lg">{props.brand}</div>
      <div className="font-sans">{props.name}</div>
      <div className="font-sans text-orange-500">${props.price}</div>
    </div>
  );
};

export default ProductGrid;
