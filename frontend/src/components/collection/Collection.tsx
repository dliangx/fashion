import { useEffect, useState } from "react";
import { CollectionInfo } from "../data/Product";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const [collections, setCollections] = useState<CollectionInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bodyStr = JSON.stringify({ start: 0, num: 10 });
    const url = "/get_collection_by_page";
    fetch(import.meta.env.VITE_API_URL + url, {
      method: "POST",
      body: bodyStr,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCollections(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div>
      <Header />

      {collections.map((item, index) => {
        return (
          <div key={item.id} className="m-4">
            <img
              src={item.pic}
              alt={item.name}
              onClick={() => navigate("/collection/" + item.id)}
            />
            <div className="flex mt-2 pb-4">
              <div className="font-serif text-xl">{index + 1}</div>
              <div className="m-auto"></div>
              <h1 className="text-xl">{item.name}</h1>
            </div>
          </div>
        );
      })}
      <div className="mb-16"></div>
      <Footer />
    </div>
  );
};

export default Collection;
