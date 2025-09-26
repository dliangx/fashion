import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import { Menu } from "./components/menu/Menu";
import Search from "./components/search/Search";
import Cart from "./components/cart/Cart";
import ProductDetailView from "./components/product/ProductDetailView";
import Collection from "./components/collection/Collection";
import CollectionDetail from "./components/collection/CollectionDetail";
import ContactUs from "./components/about/ContactUs";
import NotFound from "./components/common/NotFound";
import Checkout from "./components/order/Checkout";
import { createContext, useEffect, useState } from "react";
import { Category, CategoryResp } from "./components/data/Category";
import CategoryView, {
  CategorySearchParam,
} from "./components/product/CategoryView";
import Login from "./components/login/Login";
import { ImageSlide, ProductInfo } from "./components/data/Product";
import RequireAuth from "./components/login/RequireAuth";
import Register from "./components/login/Register";
import { CartProvider } from "./components/cart/CartContext";
import { FavoriteProvider } from "./components/cart/FavoriteContext";
import MyProfile from "./components/about/MyProfile";
import PlaceOrder from "./components/order/PlaceOrder";
import Order from "./components/order/Order";

type AppContextType = {
  theme: string;
  category: Category[];
  collapseMap: Map<number, boolean>;
  setCollapseMap: any;
  brandCollections: ImageSlide[];
  setBrandCollections: any;
  newProducts: ProductInfo[];
  setNewProducts: any;
  recommendProducts: ProductInfo[];
  setRecommendProducts: any;
  tabIndex: number;
  setTabIndex: any;
  products: ProductInfo[];
  setProducts: any;
  categorySearchParam: CategorySearchParam | null;
  setCategorySearchParam: any;
  searchHis: string[];
  setSearchHis: any;
};

const AppContext = createContext<AppContextType>({
  theme: "light",
  category: [],
  collapseMap: new Map(),
  setCollapseMap: null,
  brandCollections: [],
  setBrandCollections: null,
  newProducts: [],
  setNewProducts: null,
  recommendProducts: [],
  setRecommendProducts: null,
  tabIndex: 0,
  setTabIndex: null,
  products: [],
  setProducts: null,
  categorySearchParam: null,
  setCategorySearchParam: null,
  searchHis: [],
  setSearchHis: null,
});

function App() {
  const [theme, setTheme] = useState<string>("light");
  const [category, setCategory] = useState<Category[]>([]);
  const [collapseMap, setCollapseMap] = useState<Map<number, boolean>>(
    new Map()
  );
  const [brandCollections, setBrandCollections] = useState<ImageSlide[]>([]);
  const [newProducts, setNewProducts] = useState<ProductInfo[]>([]);
  const [recommendProducts, setRecommendProducts] = useState<ProductInfo[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [categorySearchParam, setCategorySearchParam] = useState(null);
  const [searchHis, setSearchHis] = useState([]);

  function buildTree(items: CategoryResp[], treeRoot: Category) {
    const map = new Map();
    const eleMap = new Map();
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      map.set(element.id, element.parent_id);
      eleMap.set(element.id, element);
    }
    function getKeysForValue<K, V>(map: Map<K, V>, valueToFind: V) {
      const keysWithMatchingValue = [];
      for (const [key, value] of map) {
        if (value === valueToFind) {
          keysWithMatchingValue.push(key);
        }
      }
      return keysWithMatchingValue;
    }
    function buildTreeRecursion(
      map: Map<number, number>,
      eleMap: Map<number, CategoryResp>,
      treeRoot: Category
    ) {
      if (map.has(treeRoot.id)) {
        const keys = getKeysForValue(map, treeRoot.id);
        keys.forEach((key) => {
          let item: Category = {
            id: eleMap.get(key)?.id || 0,
            name: eleMap.get(key)?.name || "",
            level: eleMap.get(key)?.level || 0,
            collapse: true,
            sub: [],
          };
          treeRoot.sub.push(item);
          buildTreeRecursion(map, eleMap, item);
        });
      }
    }

    buildTreeRecursion(map, eleMap, treeRoot);
  }

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/get_category", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const roots = data
          .filter((ele: any) => {
            return ele["level"] === 0;
          })
          .map((ele: any) => {
            let cate: Category = {
              id: ele["id"],
              name: ele["name"],
              level: ele["level"],
              collapse: false,
              sub: [],
            };

            return cate;
          });
        console.log(data);

        roots[0].collapse = true;
        console.log("build tree...");
        for (let index = 0; index < roots.length; index++) {
          buildTree(data, roots[index]);
        }

        setCategory(roots);

        console.log(roots);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const theme = mediaQuery.matches ? "dark" : "light";
    setTheme(theme);

    const handleChange = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        category,
        collapseMap,
        setCollapseMap,
        brandCollections,
        setBrandCollections,
        newProducts,
        setNewProducts,
        recommendProducts,
        setRecommendProducts,
        tabIndex,
        setTabIndex,
        products,
        setProducts,
        categorySearchParam,
        setCategorySearchParam,
        searchHis,
        setSearchHis,
      }}
    >
      <CartProvider>
        <FavoriteProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/contact_us" element={<ContactUs />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/search" element={<Search />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/collection/:id" element={<CollectionDetail />} />
              <Route path="/product" element={<CategoryView />} />
              <Route path="/product/:id" element={<ProductDetailView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/place_order"
                element={
                  <RequireAuth>
                    <PlaceOrder />
                  </RequireAuth>
                }
              />
              <Route
                path="/checkout/:order_sn"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route
                path="/order"
                element={
                  <RequireAuth>
                    <Order />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FavoriteProvider>
      </CartProvider>
    </AppContext.Provider>
  );
}

export { AppContext };
export default App;
