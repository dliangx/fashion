import { useContext, useEffect, useState } from "react";
import Products from "./Products";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import { Down, Filter, Gallery, GridView, ListView, Up } from "../common/Icon";
import Footer from "../common/Footer";
import { AppContext } from "../../App";
import { Page } from "../data/Product";
import { CategoryResp } from "../data/Category";
import PageView from "./PageView";

export type CategorySearchParam = {
  category: CategoryResp;
  search: string;
  page: Page;
};

const CategoryView = () => {
  const { products, setProducts } = useContext(AppContext);
  const { categorySearchParam, setCategorySearchParam } =
    useContext(AppContext);
  const [viewOption, setViewOption] = useState<number>(1);
  const [newOption, setNewOption] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<Page>({ start: 0, num: 10 });
  const location = useLocation();
  const category = location.state?.category;
  const search = location.state?.search;
  if (location.state != undefined && location.state.page != undefined) {
    setPage(location.state.page);
  }

  useEffect(() => {
    let bodyStr = "";
    let url = "";
    if (category != undefined) {
      bodyStr = JSON.stringify(category);
      url = "/get_product_by_category";
      if (
        products.length > 0 &&
        categorySearchParam?.category != undefined &&
        categorySearchParam?.category.id === category.id &&
        categorySearchParam?.category.level === category.level &&
        categorySearchParam?.category.name === category.name &&
        categorySearchParam?.category.parent_id === category.parent_id
      ) {
        return;
      } else {
        setCategorySearchParam({ category: category });
      }
    } else if (search != undefined) {
      let searchParam = { search: search, page: { start: 0, num: 10 } };
      bodyStr = JSON.stringify(searchParam);

      url = "/get_product_by_search";
      if (products.length > 0 && categorySearchParam?.search === search) {
        return;
      } else {
        setCategorySearchParam(searchParam);
      }
    } else if (page != undefined) {
      bodyStr = JSON.stringify(page);
      url = "/get_product_by_page";

      if (
        products.length > 0 &&
        categorySearchParam?.page != undefined &&
        categorySearchParam?.page.num == page.num &&
        categorySearchParam?.page.start == page.start
      ) {
        return;
      } else {
        let url = import.meta.env.VITE_API_URL + "/get_product_count";
        fetch(url, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setTotal(data.num);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        setCategorySearchParam({ page: page });
      }
    } else {
      bodyStr = JSON.stringify({ start: 0, num: 10 });
      url = "/get_product_by_page";
      const initPage = { num: 10, start: 0 };
      if (
        products.length > 0 &&
        categorySearchParam?.page != undefined &&
        categorySearchParam?.page.num == initPage.num &&
        categorySearchParam?.page.start == initPage.start
      ) {
        return;
      } else {
        setCategorySearchParam({ page: initPage });
      }
    }

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
        setProducts(data);
        setViewOption(1);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [category, page]);

  return (
    <>
      <Header />
      <div className="mb-16">
        <div className="flex m-4 mt-8 h-8">
          <div>{total !== 0 ? total : products.length} APPAREL</div>
          <div className="m-auto"></div>
          <button
            className="mr-4 rounded-full  w-20 flex   items-center justify-center"
            onClick={() => {
              setNewOption(newOption ? false : true);
              setProducts(products.reverse());
            }}
          >
            <div>New</div>
            {newOption && <Down></Down>}
            {!newOption && <Up></Up>}
          </button>
          <button
            className="mr-4 rounded-full  w-8 flex items-center justify-center"
            onClick={() => {
              if (viewOption == 3) {
                setViewOption(1);
              } else {
                setViewOption(viewOption + 1);
              }
            }}
          >
            {viewOption == 1 && <GridView />}
            {viewOption == 2 && <ListView />}
            {viewOption == 3 && <Gallery />}
          </button>
          <button className="rounded-full  w-8 flex items-center justify-center ">
            <Filter />
          </button>
        </div>
        <Products products={products} option={viewOption}></Products>
        <PageView
          total={total}
          pageSize={10}
          onclick={(page: Page) => {
            setPage(page);
          }}
        />
      </div>
      <Footer></Footer>
    </>
  );
};

export default CategoryView;
