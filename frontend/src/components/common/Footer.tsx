import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

const Footer = () => {
  const { tabIndex, setTabIndex } = useContext(AppContext);

  return (
    <div className="fixed bottom-0 left-0 right-0  h-16 pt-2 text-center bg-black text-white  border-none phone-width  ">
      <div className="flex">
        <div className="w-1/4 grid place-items-center">
          <Link
            to="/"
            onClick={() => {
              setTabIndex(1);
            }}
          >
            <div className="h-6 text-bottom">HOME</div>
          </Link>
          <div className="h-12">
            {1 === tabIndex && <img src="/assets/rect.svg" />}
          </div>
        </div>

        <div className="w-1/4 grid place-items-center">
          <Link
            to="/product"
            onClick={() => {
              setTabIndex(3);
            }}
          >
            <div className="h-6 ">SHIPPING</div>
          </Link>
          <div className="h-10">
            {3 === tabIndex && <img src="/assets/rect.svg" />}
          </div>
        </div>
        <div className="w-1/4 grid place-items-center">
          <Link to="/cart">
            <div className="h-6 ">CART</div>
          </Link>
          <div className="h-10">
            {2 === tabIndex && <img src="/assets/rect.svg" />}
          </div>
        </div>
        <div className="w-1/4 grid place-items-center">
          <Link
            to="/profile"
            onClick={() => {
              setTabIndex(4);
            }}
          >
            <div className="h-6 ">MY</div>
          </Link>
          <div className="h-12">
            {4 === tabIndex && <img src="/assets/rect.svg" />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
