import { useContext, useState } from "react";
import { Close } from "../common/Icon";
import CategoryList from "./CategoryList";
import { AppContext } from "../../App";

const Menu = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { category } = useContext(AppContext);
  return (
    <div>
      <Close className="m-2" onClick={() => history.go(-1)} />
      <div className="h-4" />
      <div className="flex  space-x-4">
        {category?.map((one, index) => {
          return (
            <div
              className="w-2/3"
              key={one.id}
              onClick={() => {
                setTabIndex(index);
              }}
            >
              <div className="grid place-items-center">{one.name}</div>
              <div className="grid place-items-center">
                {index === tabIndex && (
                  <img src="/assets/underline_orange.svg" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <CategoryList {...category[tabIndex]}></CategoryList>
      </div>
    </div>
  );
};

export { Menu };
