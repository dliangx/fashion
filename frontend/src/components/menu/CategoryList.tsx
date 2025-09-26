import { useContext, useState } from "react";
import { Category } from "../data/Category";
import CategoryItem from "./CategoryItem";
import { AppContext } from "../../App";

function CategoryList(props: Category) {
  const [collapse, setCollapse] = useState<boolean>();
  const { collapseMap, setCollapseMap } = useContext(AppContext);
  const handClickItem = (index: number) => {
    setCollapse(collapse ? false : true);
    setCollapseMap(
      collapseMap.set(index, collapseMap.get(index) ? false : true)
    );
  };

  return (
    <>
      {props.sub !== undefined &&
        props.sub.map((param) => {
          return (
            <div key={1000 + param.id}>
              <CategoryItem
                props={param}
                onclick={() => handClickItem(param.id)}
                key={param.id}
              ></CategoryItem>
              {param.sub.length > 0 ? (
                collapseMap.get(param.id) && (
                  <CategoryList {...param}></CategoryList>
                )
              ) : (
                <></>
              )}
            </div>
          );
        })}
    </>
  );
}

export default CategoryList;
