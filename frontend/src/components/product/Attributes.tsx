import { useContext, useState } from "react";
import { AttrContext } from "./ProductDetailView";

export type Attr = {
  name: string;
  values: string[];
};

const Attributes = (attr: Attr) => {
  const [selectIndex, setSelectIndex] = useState(-1);
  const { selectAttrMap, setSelectAttrMap } = useContext(AttrContext);
  return (
    <div className="flex ">
      <h2 className="mr-4 font-sans">{attr.name}</h2>

      {attr.values.map((value, attrIndex) => {
        return (
          <div className="mr-4" key={value}>
            {attr.name == "Color" && (
              <>
                <button
                  className={`w-4 h-4  rounded-full border  
                            ${value === "black" ? " bg-black" : "bg-black"} 
                            ${
                              value === "orange" ? " bg-orange-500" : "bg-black"
                            } 
                              ${value === "white" ? " bg-gray-200" : "bg-black"}
                              ${value.startsWith("#") ? value : "bg-black"} 
                              ${
                                selectIndex == attrIndex
                                  ? " border-orange-700"
                                  : " border-white"
                              }
                            `}
                  onClick={() => {
                    setSelectIndex(attrIndex);
                    setSelectAttrMap(selectAttrMap.set("Color", value));
                  }}
                ></button>
              </>
            )}
            {attr.name != "Color" && (
              <button
                className={`w-5 h-5  rounded-full border text-xs  align-text-top
                        ${
                          selectIndex == attrIndex
                            ? " border-orange-700"
                            : " border-white"
                        }
                        `}
                onClick={() => {
                  setSelectIndex(attrIndex);
                  setSelectAttrMap(selectAttrMap.set(attr.name, value));
                }}
              >
                {value}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Attributes;
