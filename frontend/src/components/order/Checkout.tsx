import { useEffect, useState } from "react";
import Header from "../common/Header";
import { ShoppingBag } from "../common/Icon";
import PaymentSuccess from "./PaymentSuccess";
import { AddressView } from "./AddNewAddress";
import { CardView } from "./AddNewCard";
import { Address, PaymentCard } from "../data/User";
import { useParams } from "react-router-dom";
import { OrderItem } from "../data/Order";

const Checkout = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const order_sn = useParams().order_sn;

  const [shippingAddress, setShippingAddress] = useState<Address>();
  const [paymentCard, setPaymentCard] = useState<PaymentCard>();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [orderStatus, setOrderStatus] = useState(0);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const bodyStr = JSON.stringify({ order_sn: order_sn, user_name: username });
    const url = import.meta.env.VITE_API_URL + "/api/get_order_detail";

    const token = localStorage.getItem("user_token");
    if (token != undefined && username != null) {
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
          setShippingAddress({
            username: username,
            first_name: data.receiver_name,
            second_name: "",
            address: data.receiver_address,
            city: data.receiver_city,
            state: data.receiver_state,
            zip: data.receiver_zip_code,
            phone: data.receiver_phone,
          });
          setPaymentCard({
            id: data.pay_type,
            username: username,
            card_type: data.pay_type,
            card_name: "",
            card_num: "",
            exp_mon: "",
            exp_year: "",
            cvv: "",
          });
          setItems(data.items);
          setOrderStatus(data.order_status);
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
          <OrderItemsRemote items={items} />
        </div>
        {shippingAddress != null && (
          <AddressView address={shippingAddress} onclick={() => {}} />
        )}
        {paymentCard != null && (
          <CardView card={paymentCard} onclick={() => {}} />
        )}
      </div>

      {isSuccess && (
        <PaymentSuccess
          onclick={() => {
            setOrderStatus(2);
            setIsSuccess(false);
          }}
        />
      )}
      {orderStatus < 2 && (
        <div className="fixed bottom-0 left-0 right-0 h-14 bg-black text-white border-none phone-width   place-content-center z-50">
          <div
            className="flex  text-center  place-content-center"
            onClick={() => {
              const username = localStorage.getItem("username");
              const bodyStr = JSON.stringify({
                user_name: username,
                order_sn: order_sn,
              });
              const url = import.meta.env.VITE_API_URL + "/api/checkout";
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
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
              setIsSuccess(true);
            }}
          >
            <ShoppingBag className="mr-4" color="white" />
            <div>CHECKOUT</div>
          </div>
        </div>
      )}
    </div>
  );
};

export const OrderItemsRemote = (props: { items: OrderItem[] }) => {
  return (
    <div>
      {props.items.map((item, index) => {
        return (
          <div className="flex w-full mt-4 mb-4" key={index}>
            <div className="h32 w-1/4">
              <img src={item.product_pic} alt={item.product_name} />
            </div>
            <div className="h32 w-3/4 ml-2  space-y-2">
              <div className="font-sans">{item.product_name}</div>

              <div className="font-sans text-orange-500">
                ${item.product_price} * {item.product_quantity}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Checkout;
