import { useContext } from "react";
import { Close, ShoppingBag } from "../common/Icon";
import { AppContext } from "../../App";
import { CartContext } from "./CartContext";
import CartItemView from "./CartItemView";
import { FavoriteContext } from "./FavoriteContext";
import FavoriteItemView from "./FavoriteItemView";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../data/Cart";

export const calcItemPrice = (items: CartItem[]) => {
  let price = 0;
  for (let index = 0; index < items.length; index++) {
    price += items[index].price * items[index].num;
  }
  return price;
};

const Cart = () => {
  const { theme } = useContext(AppContext);
  const { cartIndex, setCartIndex } = useContext(CartContext);
  const { state } = useContext(CartContext);
  const favoriteContext = useContext(FavoriteContext);
  const favoriteState = favoriteContext.state;
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <Close className="m-2" onClick={() => history.go(-1)} />

      <div className="flex mt-4 place-items-center  ">
        <div
          className={`w-1/2 h-8  content-center text-center  border-r-0 border-l-0  border 
          ${theme === "dark" ? "border-white " : "border-black"}
          ${cartIndex == 0 ? "text-lg " : "text-sm"}
          `}
          onClick={() => {
            setCartIndex(0);
          }}
        >
          CART({state.items.length})
        </div>
        <div
          className={`flex w-1/2 h-8 place-content-center   place-items-center  border-r-0  border 
          ${theme === "dark" ? "border-white " : "border-black"}
          ${cartIndex == 1 ? "text-lg" : "text-sm"}
          `}
          onClick={() => {
            setCartIndex(1);
          }}
        >
          FAVORITE
        </div>
      </div>
      <div className="m-2 mb-16">
        {cartIndex == 0 && state.items.length == 0 && (
          <div className="grid  place-items-center mt-24">
            <div>You Shopping Bag Is Empty.</div>
          </div>
        )}

        {cartIndex == 0 && (
          <div>
            {state.items.map((item) => {
              return (
                <CartItemView
                  id={item.id}
                  pic={item.pic}
                  brand={item.brand}
                  name={item.name}
                  num={item.num}
                  price={item.price}
                  attr={item.attr}
                  key={item.id.toString()}
                />
              );
            })}
          </div>
        )}
        {cartIndex == 0 && state.items.length > 0 && (
          <div className="flex p-4">
            TOTAL
            <div className="m-auto " />
            <div className=" text-orange-500">
              {" "}
              ${calcItemPrice(state.items)}
            </div>
          </div>
        )}

        {cartIndex == 1 &&
          localStorage.getItem("user_token") != undefined &&
          favoriteState.items.map((item) => {
            return (
              <div>
                <FavoriteItemView
                  id={item.id}
                  pic={item.pic}
                  brand={item.brand}
                  name={item.name}
                  price={item.price}
                  key={item.id.toString()}
                />
              </div>
            );
          })}
      </div>
      <div className="fixed bottom-0 left-0 right-0  h-14 text-center bg-black text-white  border-none phone-width   place-content-center ">
        {cartIndex == 0 && state.items.length == 0 && (
          <div
            className="flex place-content-center w-full "
            onClick={() => {
              setCartIndex(3);
              navigate("/product");
            }}
          >
            <ShoppingBag className="mr-4" color="#fff" />
            CONTINUE SHOPPING
          </div>
        )}
        {cartIndex == 0 && state.items.length > 0 && (
          <div
            className=" place-content-center w-full "
            onClick={() => {
              navigate("/place_order");
            }}
          >
            BUY NOW
          </div>
        )}
        {cartIndex == 1 && (
          <div className=" place-content-center w-full ">ADD TO CART</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
