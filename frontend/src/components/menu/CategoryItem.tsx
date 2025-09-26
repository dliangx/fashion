import { CategoryItemProps } from "../data/Category";
import { Down, Forward } from "../common/Icon";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ props, onclick }: CategoryItemProps) => {
  const { collapseMap } = useContext(AppContext);
  const { setTabIndex } = useContext(AppContext);
  const navigate = useNavigate();
  function calcDepStr(level: number) {
    if (level == 0) {
      return "flex ml-6";
    } else if (level == 1) {
      return "flex ml-6";
    } else if (level == 2) {
      return "flex ml-12";
    } else if (level == 3) {
      return "flex ml-16";
    } else if (level == 4) {
      return "flex ml-28";
    } else {
      return "flex ml-28";
    }
  }
  const Collapse = () => {
    return (
      <>
        {props.sub.length > 0 && collapseMap.get(props.id) && <Down />}
        {props.sub.length > 0 && !collapseMap.get(props.id) && <Forward />}
      </>
    );
  };

  return (
    <div>
      <div className="flex mt-4 ">
        <div className={calcDepStr(props.level)}></div>
        <div
          className=" flex-grow"
          onClick={() => {
            console.log(props);
            setTabIndex(3);
            navigate("/product", {
              state: {
                category: {
                  id: props.id,
                  name: props.name,
                  level: props.level,
                  parent_id: 0,
                },
              },
            });
          }}
          //TODO route jump
        >
          {props.name}
        </div>

        <div
          className="mr-6 ml-10 flex-grow-0"
          onClick={() => {
            onclick();
          }}
        >
          <Collapse />
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
