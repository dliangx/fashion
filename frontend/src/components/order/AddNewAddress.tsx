import { useState } from "react";
import { Close, Down, Forward } from "../common/Icon";
import { Address } from "../data/User";
import { createPortal } from "react-dom";
import CustomInput from "./CustomInput";
import AlertModal from "../product/AlertModal";

export const ShippingMethod = (props: {
  shippingMethod: string;
  setShippingMethod: any;
}) => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const methods = ["Express(Free)", "Pickup at store"];
  return (
    <div className="mt-4">
      <div>SHIPPING METHOD</div>

      <button
        className="w-full  rounded-3xl p-3 mt-2"
        onClick={() => {
          setIsCollapse(isCollapse ? false : true);
        }}
      >
        <div className="flex">
          {selectIndex < 0 && <div>Select shipping method</div>}
          {selectIndex >= 0 && <div>{methods[selectIndex]}</div>}
          <div className="m-auto"></div>
          {isCollapse && <Down />}
          {!isCollapse && <Forward />}
        </div>
      </button>
      {isCollapse &&
        methods.map((item, index) => {
          return (
            <div
              className="ml-8 h-10 place-content-end"
              key={index}
              onClick={() => {
                setSelectIndex(index);
                setIsCollapse(false);
                props.setShippingMethod(methods[index]);
              }}
            >
              {item}
            </div>
          );
        })}
    </div>
  );
};

export const AddressView = (props: { address: Address; onclick: any }) => {
  return (
    <div className="flex  pt-4 pb-4 ">
      <div onClick={props.onclick}>
        <div className="font-serif">
          {props.address.first_name}&nbsp;
          {props.address.second_name}
        </div>
        <div>
          {props.address.zip}
          {props.address.state}
        </div>
        <div>{props.address.address}</div>
        <div>{props.address.phone}</div>
      </div>
      <div className="m-auto"></div>
      <div
        className="ml-8 place-content-center"
        onClick={() => {
          console.log("go to edit address");
        }}
      >
        <Forward />
      </div>
    </div>
  );
};

export const ShippingAddress = (props: {
  shippingAddress: Address[];
  setShippingAddress: any;
  setSelectShippingAddressIndex: any;
}) => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [isShowAddNewAddress, setIsShowAddNewAddress] = useState(false);
  return (
    <div>
      <div>SHIPPING ADDRESS</div>
      <div className="ml-4 mr-4">
        {index >= 0 && (
          <AddressView
            address={props.shippingAddress[index]}
            onclick={() => {}}
          />
        )}
      </div>

      <button
        className="w-full  rounded-3xl p-3 mt-2"
        onClick={() => {
          setIsCollapse(isCollapse ? false : true);
        }}
      >
        <div className="flex">
          <div className=" ">Select shipping address</div>
          <div className="m-auto"></div>
          {isCollapse && <Down />}
          {!isCollapse && <Forward />}
        </div>
      </button>
      {isCollapse &&
        props.shippingAddress != undefined &&
        props.shippingAddress.map((address, index) => {
          return (
            <div className="ml-8" key={index}>
              <AddressView
                address={address}
                onclick={() => {
                  setIndex(index);
                  setIsCollapse(false);
                  props.setSelectShippingAddressIndex(index);
                }}
              />
            </div>
          );
        })}
      {isCollapse && (
        <div
          className="ml-8 h-10 place-content-end "
          onClick={() => {
            setIsShowAddNewAddress(true);
          }}
        >
          Add New address
        </div>
      )}
      {isShowAddNewAddress &&
        createPortal(
          <AddNewAddress
            onClose={() => {
              setIsShowAddNewAddress(false);
            }}
          ></AddNewAddress>,
          document.body
        )}
    </div>
  );
};

const AddNewAddress = (props: { onClose: any }) => {
  const name_regular = "^.{3,30}$";
  const address_regular = "^.{3,60}$";
  const city_state_regular = "^.{1,20}$";
  const zip_regular = "^.{3,10}$";
  const phone_regular = "^1[3-9][0-9]{9}$";

  const [isShowAlert, setIsShowAlert] = useState(false);
  const [address, setAddress] = useState<Address>({
    username: "",
    first_name: "",
    second_name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  function handleAddAddress() {
    const username = localStorage.getItem("username");
    if (username != undefined) {
      address.username = username;
    }
    if (
      address.first_name !== "" &&
      address.second_name !== "" &&
      address.address !== "" &&
      address.city !== "" &&
      address.state !== "" &&
      address.zip !== "" &&
      address.phone != ""
    ) {
      console.log(address);
      const url = import.meta.env.VITE_API_URL + "/api/add_shipping_address";
      const bodyStr = JSON.stringify(address);
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
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
            location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      setIsShowAlert(true);
    }
  }
  return (
    <div className="modal phone-width">
      <Close className="m-4" onClick={props.onClose} />
      <div className="grid place-items-center mt-10 mb-8">
        <h1 className="text-center text-xl ">ADD SHIPPING ADDRESS</h1>
        <img src="/assets/underline.svg"></img>
      </div>
      <div className="m-4">
        <div className="flex">
          <CustomInput
            locationStyle={"w-1/2 mt-4 mr-2 "}
            placeholder={"First name"}
            type={"text"}
            regular={name_regular}
            errorMsg={"input length 3-30"}
            setValue={(value) => {
              if (value != undefined) {
                setAddress({ ...address, first_name: value });
              }
            }}
          />
          <CustomInput
            locationStyle={"w-1/2  mt-4 ml-2"}
            placeholder={"Second name"}
            type={"text"}
            regular={name_regular}
            errorMsg={"input length 3-30"}
            setValue={(value) => {
              if (value != undefined) {
                setAddress({ ...address, second_name: value });
              }
            }}
          />
        </div>

        <CustomInput
          locationStyle={"mt-4 "}
          placeholder={"Address"}
          type={"text"}
          regular={address_regular}
          errorMsg={"please input address,length is 3-60 "}
          setValue={(value) => {
            if (value != undefined) {
              setAddress({ ...address, address: value });
            }
          }}
        />
        <CustomInput
          locationStyle={"mt-4 "}
          placeholder={"City"}
          type={"text"}
          regular={city_state_regular}
          errorMsg={"please input city,max length is 20"}
          setValue={(value) => {
            if (value != undefined) {
              setAddress({ ...address, city: value });
            }
          }}
        />

        <div className="flex">
          <CustomInput
            locationStyle={"w-1/2 mt-4 mr-2"}
            placeholder={"State"}
            type={"text"}
            regular={city_state_regular}
            errorMsg={"max length is 20"}
            setValue={(value) => {
              if (value != undefined) {
                setAddress({ ...address, state: value });
              }
            }}
          />
          <CustomInput
            locationStyle={"w-1/2  mt-4 ml-2"}
            placeholder={"ZIP code"}
            type={"text"}
            regular={zip_regular}
            errorMsg={"max length is 10"}
            setValue={(value) => {
              if (value != undefined) {
                setAddress({ ...address, zip: value });
              }
            }}
          />
        </div>
        <CustomInput
          locationStyle={"mt-4 w-full"}
          placeholder={"Phone Number"}
          type={"text"}
          regular={phone_regular}
          errorMsg={"please input cellphone number"}
          setValue={(value) => {
            if (value != undefined) {
              setAddress({ ...address, phone: value });
            }
          }}
        />
      </div>
      {isShowAlert &&
        createPortal(
          <AlertModal
            content={"please fill all input!"}
            onClose={() => {
              setIsShowAlert(false);
            }}
          />,
          document.body
        )}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-black text-white border-none phone-width   place-content-center">
        <div
          className="flex  text-center  place-content-center"
          onClick={handleAddAddress}
        >
          <div>ADD NOW</div>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddress;
