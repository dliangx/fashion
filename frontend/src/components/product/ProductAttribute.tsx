import { useContext, useEffect, useState } from "react";
import { AttributeProps } from "../data/Product";
import Attributes, { Attr } from "./Attributes";
import { AttrContext } from "./ProductDetailView";

const ProductAttribute = (props: AttributeProps) => {
  const [attrs, setAttrs] = useState<Attr[]>([]);
  const { selectAttrMap, setSelectAttrMap } = useContext(AttrContext);

  useEffect(() => {
    let attrRes = [];
    let attr_cache: string[] = [];
    let attr_name_cache = "";
    for (let index = 0; index < props.attrs.length; index++) {
      const element = props.attrs[index];
      if (attr_name_cache == "") {
        attr_name_cache = element.name;
        attr_cache.push(element.value);
      } else if (attr_name_cache != element.name) {
        const attr1: Attr = { name: attr_name_cache, values: attr_cache };
        attrRes.push(attr1);
        if (!selectAttrMap.has(attr_name_cache)) {
          setSelectAttrMap(selectAttrMap.set(attr_name_cache, ""));
        }
        attr_cache = [];
        attr_name_cache = element.name;
        attr_cache.push(element.value);
      } else if (attr_name_cache == element.name) {
        attr_cache.push(element.value);
      }
    }
    const attr2: Attr = { name: attr_name_cache, values: attr_cache };
    attrRes.push(attr2);
    if (!selectAttrMap.has(attr_name_cache)) {
      setSelectAttrMap(selectAttrMap.set(attr_name_cache, ""));
    }

    setAttrs(attrRes);
  }, [props]);

  return (
    <>
      <div className="flex flex-wrap">
        {attrs.map((attr, index) => {
          return <Attributes {...attr} key={index} />;
        })}
      </div>
    </>
  );
};

export default ProductAttribute;
