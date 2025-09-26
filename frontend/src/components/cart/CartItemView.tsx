import { useContext, useState } from "react";
import { CartItem } from "../data/Cart";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Close, MINUS, Plus } from "../common/Icon";
import { CartContext } from "./CartContext";

const CartItemView = (props: CartItem) => {
  const { setTabIndex } = useContext(AppContext);
  const [num, setNum] = useState(props.num);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex w-full mt-2">
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
          <div className="flex">
            <div className="font-mono text-xl  mt-2">{props.brand}</div>
            <div className="m-auto"></div>
            <div className="mt-2">
              <Close
                className="mr-8"
                onClick={() => {
                  setNum(num + 1);
                  dispatch != null &&
                    dispatch({
                      type: "REMOVE",
                      payload: {
                        id: props.id,
                        pic: props.pic,
                        brand: props.brand,
                        name: props.name,
                        price: props.price,
                        num: 0,
                        attr: props.attr,
                      },
                    });
                }}
              />
            </div>
          </div>

          <div className="font-sans">{props.name}</div>
          <div className="flex mt-2 mb-2">
            <button className="mr-2 rounded-full border   place-content-center ">
              <MINUS
                onClick={() => {
                  setNum(num - 1 >= 1 ? num - 1 : 1);
                  dispatch != null &&
                    dispatch({
                      type: "MINUS",
                      payload: {
                        id: props.id,
                        pic: props.pic,
                        brand: props.brand,
                        name: props.name,
                        price: props.price,
                        num: 0,
                        attr: props.attr,
                      },
                    });
                }}
              />
            </button>
            <div className=" align-middle">{num}</div>

            <button className="ml-2 rounded-full border">
              <Plus
                onClick={() => {
                  setNum(num + 1);
                  dispatch != null &&
                    dispatch({
                      type: "ADD",
                      payload: {
                        id: props.id,
                        pic: props.pic,
                        brand: props.brand,
                        name: props.name,
                        price: props.price,
                        num: 0,
                        attr: props.attr,
                      },
                    });
                }}
              />
            </button>
          </div>
          <div className="flex flex-wrap">
            {props.attr.map((attr, index) => {
              return (
                <div className="flex  font-sans" key={index}>
                  <div>{attr.name}-</div>
                  <div>({attr.value});</div>
                </div>
              );
            })}
          </div>
          <div className="font-sans text-orange-500">${props.price}</div>
        </div>
      </div>
    </>
  );
};

export default CartItemView;
