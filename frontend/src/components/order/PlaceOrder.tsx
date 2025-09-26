import { useContext, useEffect, useState } from "react";
import Header from "../common/Header";
import { ShoppingBag } from "../common/Icon";
import { CartContext } from "../cart/CartContext";
import { ShippingAddress, ShippingMethod } from "./AddNewAddress";
import { PaymentMethod } from "./AddNewCard";
import { Address, PaymentCard } from "../data/User";
import { createPortal } from "react-dom";
import AlertModal from "../product/AlertModal";
import { Order, OrderItem } from "../data/Order";
import { calcItemPrice } from "../cart/Cart";
import { useNavigate } from "react-router-dom";

export const OrderItems = () => {
  const { state } = useContext(CartContext);

  return (
    <div>
      {state.items.map((item, index) => {
        return (
          <div className="flex w-full mt-4 mb-4" key={index}>
            <div className="h32 w-1/4">
              <img src={item.pic} alt={item.name} />
            </div>
            <div className="h32 w-3/4 ml-2  space-y-2">
              <div className="font-mono text-xl  mt-4">{item.brand}</div>
              <div className="font-sans">{item.name}</div>
              <div className="flex flex-wrap">
                {item.attr.map((attr, index) => {
                  return (
                    <div className="flex font-sans " key={index}>
                      <div>{attr.name}-</div>
                      <div>({attr.value});</div>
                    </div>
                  );
                })}
              </div>
              <div className="font-sans text-orange-500">
                ${item.price} * {item.num}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PlaceOrder = () => {
  const [shippingAddress, setShippingAddress] = useState<Address[]>([]);
  const [shippingMethod, setShippingMethod] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentCard[]>([]);
  const { state, dispatch } = useContext(CartContext);
  const cartItems = state.items;

  const [selectShippingAddressIndex, setSelectShippingAddressIndex] =
    useState<number>(-1);
  const [selectPaymentMethodIndex, setSelectPaymentMethodIndex] =
    useState<number>(-1);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (selectShippingAddressIndex < 0) {
      setIsShowAlert(true);
      setAlertMsg("please select shipping address!");

      return;
    }
    if (shippingMethod == "") {
      setIsShowAlert(true);
      setAlertMsg("please select shipping method!");

      return;
    }
    if (selectPaymentMethodIndex < 0) {
      setIsShowAlert(true);
      setAlertMsg("please select payment method!");

      return;
    }
    //place order
    const username = localStorage.getItem("username");
    if (username != undefined) {
      let orderItems: OrderItem[] = [];
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        let orderItem: OrderItem = {
          order_id: 0,
          order_sn: "",
          product_id: item.id,
          product_pic: item.pic,
          product_name: item.name,
          product_sn: "",
          product_price: item.price,
          product_quantity: item.num,
          product_sku_id: 0,
          product_category_id: 0,
          product_attr: JSON.stringify(item.attr),
        };
        orderItems.push(orderItem);
      }

      let order: Order = {
        order_sn: "",
        user_name: username,
        total_amount: calcItemPrice(state.items),
        pay_amount: 0,
        freight_amount: 0,
        pay_type: paymentMethod[selectPaymentMethodIndex].id,
        source_type: shippingMethod,
        delivery_sn: "",
        receiver_name:
          shippingAddress[selectShippingAddressIndex].first_name +
          shippingAddress[selectShippingAddressIndex].second_name,
        receiver_zip_code: shippingAddress[selectShippingAddressIndex].zip,
        receiver_city: shippingAddress[selectShippingAddressIndex].city,
        receiver_state: shippingAddress[selectShippingAddressIndex].state,
        receiver_address: shippingAddress[selectShippingAddressIndex].address,
        receiver_phone: shippingAddress[selectShippingAddressIndex].phone,
        order_status: 1,
        items: orderItems,
      };
      const bodyStr = JSON.stringify(order);
      const url = import.meta.env.VITE_API_URL + "/api/create_order";
      const token = localStorage.getItem("user_token");
      if (token != undefined) {
        fetch(url, {
          method: "POST",
          body: bodyStr,
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            dispatch != null &&
              dispatch({
                type: "REMOVE_ALL",
                payload: {
                  id: 0,
                  pic: "",
                  brand: "",
                  name: "",
                  price: 0,
                  num: 0,
                  attr: [],
                },
              });
            navigate("/checkout/" + data.order_sn);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username != undefined) {
      const url = import.meta.env.VITE_API_URL + "/api/get_shipping_address";
      const bodyStr = JSON.stringify({ username: username });
      const token = localStorage.getItem("user_token");
      fetch(url, {
        method: "POST",
        body: bodyStr,
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setShippingAddress(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username != undefined) {
      const url = import.meta.env.VITE_API_URL + "/api/get_payment_method";
      const bodyStr = JSON.stringify({ username: username });
      const token = localStorage.getItem("user_token");
      fetch(url, {
        method: "POST",
        body: bodyStr,
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPaymentMethod(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="m-4 mb-16">
        <div className="mt-4">
          <OrderItems />
        </div>

        <ShippingAddress
          shippingAddress={shippingAddress}
          setShippingAddress={setShippingAddress}
          setSelectShippingAddressIndex={setSelectShippingAddressIndex}
        />
        <ShippingMethod
          setShippingMethod={setShippingMethod}
          shippingMethod={shippingMethod}
        />

        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setSelectPaymentMethodIndex={setSelectPaymentMethodIndex}
        />
      </div>
      {isShowAlert &&
        createPortal(
          <AlertModal
            content={alertMsg}
            onClose={() => {
              setIsShowAlert(false);
            }}
          />,
          document.body
        )}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-black text-white border-none phone-width   place-content-center">
        <div
          className="flex  text-center  place-content-center"
          onClick={handlePlaceOrder}
        >
          <ShoppingBag className="mr-4" color="white" />
          <div>PLACE ORDER</div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
