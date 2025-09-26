import { useNavigate } from "react-router-dom";
import { Close } from "../common/Icon";

const PaymentSuccess = (props: { onclick: any }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute bottom-0 top-0 left-0 right-0 bg-black  bg-opacity-80 phone-width  z-10">
      <div className="mt-20 m-4 pt-4 alert ">
        <Close className="ml-4" onClick={props.onclick} />
        <div className="grid place-items-center mt-10 mb-8">
          <h1 className="text-center text-xl ">PAYMENT SUCCESS</h1>
        </div>
        <div className="grid place-items-center">
          <img src="/assets/success.svg" />
          <div className="mt-8"> Your payment was success </div>
          <div className="mt-2">Payment ID </div>
          <img className="m-4" src="/assets/underline.svg"></img>
          <div>Rate you purchase</div>
          <div className="flex mt-2  space-x-2">
            <img src="/assets/rate1.svg" />
            <img src="/assets/rate2.svg" />
            <img src="/assets/rate3.svg" />
          </div>
          <div className="flex w-full p-4">
            <button className="w-1/2 m-2 h-10">SUBMIT</button>
            <button className="w-1/2 m-2 h-10" onClick={() => navigate("/")}>
              BACK TO HOME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
