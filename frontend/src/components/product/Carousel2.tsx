import { ProductInfo } from "../data/Product";

const Carousel2 = ({
  products,
  width,
  padding,
  onclick,
}: {
  products: ProductInfo[];
  width: string;
  padding: string;
  onclick: any;
}) => {
  return (
    <div className=" flex overflow-x-scroll">
      {products.map((product, index) => (
        <div className={`flex-none snap-center ${width}`} key={index}>
          <img
            src={product.pic}
            alt={product.name}
            className={` ${padding} `}
            key={index}
            onClick={onclick}
          />
          <div className="font-serif text-lg text-center">{product.name}</div>
          <div className="font-sans text-center">{product.brand}</div>
          <div className="font-sans text-center text-orange-500">
            ${product.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel2;
