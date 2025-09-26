import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { ImageSlide } from "../data/Product";
import { useNavigate } from "react-router-dom";
import Carousel from "../product/Carousel";

const Collections = () => {
  const { brandCollections, setBrandCollections } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    let collectionList: ImageSlide[] = [];
    if (brandCollections.length == 0) {
      fetch(import.meta.env.VITE_API_URL + "/home_new_collection", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          for (let i = data.length - 1; i >= 0; i--) {
            const collection = data[i];
            collectionList.push({
              src: collection.pic,
              alt: collection.name,
            });
          }
          setBrandCollections(collectionList);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  return (
    <div className="relative w-full mt-4">
      <Carousel images={brandCollections} isListButton={true} />
      <div className="absolute left-0 bottom-10  w-full flex items-center justify-center ">
        <button
          className="rounded-full bg-black p-2 bg-opacity-30 text-white"
          onClick={() => {
            navigate("/collection");
          }}
        >
          EXPLORE COLLECTION
        </button>
      </div>
    </div>
  );
};

export default Collections;
