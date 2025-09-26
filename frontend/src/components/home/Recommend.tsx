import { useContext, useEffect } from "react";
import { ProductInfo } from "../data/Product";
import Carousel2 from "../product/Carousel2";
import { AppContext } from "../../App";

const Recommend = () => {
  const { recommendProducts, setRecommendProducts } = useContext(AppContext);

  useEffect(() => {
    if (recommendProducts.length == 0) {
      fetch(import.meta.env.VITE_API_URL + "/home_recommend_product", {
        method: "POST",
        body: JSON.stringify({ name: localStorage.getItem("username") }),
        headers: {
          "content-type": "application/json",
        },
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

          setRecommendProducts(products);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);
  return (
    <div className="grid place-items-center mt-10 mb-8">
      <h1 className="text-center text-xl font-serif">JUST FOR YOU</h1>
      <img src="/assets/underline.svg"></img>
      <Carousel2
        products={recommendProducts}
        width={"w-3/4"}
        padding={"p-2"}
        onclick={null}
      ></Carousel2>
    </div>
  );
};

export default Recommend;
