import { useContext, useState } from "react";
import { FavoriteItem } from "../data/Cart";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Heart } from "../common/Icon";
import { FavoriteContext } from "./FavoriteContext";

const FavoriteItemView = (props: FavoriteItem) => {
  const { setTabIndex } = useContext(AppContext);
  const navigate = useNavigate();
  const { dispatch } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <>
      <div className="flex w-full m-2">
        <div className="h32 w-1/4">
          <img
            src={props.pic}
            alt={props.name}
            onClick={() => {
              setTabIndex(3);
              navigate("/product/" + props.id.toString());
            }}
          />
        </div>
        <div className="h32 w-3/4 ml-2">
          <div className="font-mono text-xl  mt-4">{props.brand}</div>
          <div className="font-sans">{props.name}</div>
          <div className="font-sans text-orange-500">${props.price}</div>
          <Heart
            className="mt-4 right-2 bottom-2 h-4 "
            color="#ff4700"
            fill={isFavorite ? "#ff4700" : "none"}
            onClick={() => {
              if (localStorage.getItem("user_token") == undefined) {
                navigate("/login");

                return;
              }

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
            }}
          />
        </div>
      </div>
    </>
  );
};

export default FavoriteItemView;
