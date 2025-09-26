import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CollectionDetailInfo } from "../data/Product";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Products from "../product/Products";

const CollectionDetail = () => {
  const [detail, setDetail] = useState<CollectionDetailInfo>();
  const param = useParams();
  useEffect(() => {
    const url =
      import.meta.env.VITE_API_URL + "/get_collection/" + String(param.id);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDetail(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [param]);

  return (
    <>
      <Header />
      <div className="pb-8 pt-4">
        <div className="items-center justify-center ">
          <img src="/assets/collection.png" />
        </div>
        <div>
          <img src={detail?.collection.pic} />
        </div>
        {detail?.products != undefined && (
          <Products products={detail?.products} option={1} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default CollectionDetail;
