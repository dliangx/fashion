import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { ProductInfo } from "../data/Product";
import Products from "../product/Products";

const NewArrival = () => {
  const { newProducts, setNewProducts } = useContext(AppContext);

  useEffect(() => {
    if (newProducts.length == 0) {
      fetch(import.meta.env.VITE_API_URL + "/home_new_product", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const products = data.map((element: any) => {
            const product: ProductInfo = {
              id: element.id,
              name: element.name,
              category: element.category,
              pic: element.pic,
              brand: element.brand,
              rating: element.rating,
              price: element.price,
            };

            return product;
          });

          setNewProducts(products);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  return (
    <>
      <div className="grid place-items-center mt-10 mb-8">
        <h1 className="text-center text-xl font-serif">NEW ARRIVAL</h1>
        <img src="/assets/underline.svg"></img>
        <div>
          <Products products={newProducts} option={1}></Products>
        </div>
      </div>
    </>
  );
};

export default NewArrival;
