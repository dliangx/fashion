import Header from "./Header";
import { Backward } from "./Icon";

const NotFound = () => {
  return (
    <div id="error-page">
      <div>
        <Header></Header>
      </div>
      <div className="grid place-items-center">
        <div className="m-4 place-items-center ">
          <h1 className="text-center mt-8">PAGE NOT FOUND</h1>
          <div className="grid place-items-center mt-8">
            <img src="/assets/tailors.svg" />
          </div>
          <div className="grid place-items-center">
            <p className="w-2/3 text-center mt-8">
              We can't find the page you looking for ,it will return to the.
            </p>
          </div>
          <div className="grid place-items-center">
            <button className="mt-8 bg-black h-10  text-cyan-50 w-1/2">
              <div className="flex  justify-center">
                <Backward />
                HOME PAGE
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
