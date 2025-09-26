import { ProductInfo } from "../data/Product";
import ProductGrid from "./ProductGrid";
import ProductList from "./ProductList";

type productsProps = {
  products: ProductInfo[];
  option: number;
};

const Products = (props: productsProps) => {
  return (
    <>
      <div className="flex flex-wrap w-full p-2">
        {props.option == 1 &&
          props.products.map((product, index) => {
            return (
              <div className="w-1/2" key={index}>
                <ProductGrid {...product} key={index} />
              </div>
            );
          })}
      </div>
      {props.option == 2 && (
        <div className="w-full p-2">
          {props.products.map((product, index) => {
            return <ProductList {...product} key={index} />;
          })}
        </div>
      )}
      {props.option == 3 && (
        <div className="grid w-full p-2">
          {props.products.map((product, index) => {
            return (
              <div key={index}>
                <ProductGrid {...product} key={index} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Products;
