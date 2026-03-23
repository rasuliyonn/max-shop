//Max-Shop

import Header from "./components/Header";
import Slider from "./components/Slider";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Card from "./components/Card";
import Basket from "./components/Basket";
import ProductPage from "./components/ProoductPage";
import { useCartStore } from "./managment/useBasket";
import News from "./components/News";
import OnSale from "./components/OnSale";
import All from "./components/All";
const App = () => {
  const navigate = useNavigate();
  const product = useCartStore((state) => state.product);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Slider />

              <div className="text-5xl font-bold text-center mt-2 md:mt-16 ">
                Новые товары
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 container mx-auto mt-14 gap-5">
                {product
                  .slice(0, 4)
                  .filter((item) => item.category == "new")
                  .map((item, index) => (
                    <Card
                      key={index}
                      id={item.id}
                      img_src={item.img_url}
                      name={item.title}
                      price={item.price}
                      colors={item.colors}
                    />
                  ))}
              </div>

              <div className="flex justify-center mt-1 border-2 duration-500 rounded-2xl w-auto h-auto p-4 bg-black text-white hover:text-black hover:bg-white ">
                <button onClick={() => navigate("/all")}>
                  Посмотреть все товары
                </button>
              </div>
              <div className="text-5xl font-bold text-center mt-2 md:mt-16 ">
                Распродажа
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 container mx-auto mt-14 gap-5">
                {product
                  .slice(0, 4)
                  .filter((item) => item.category == "on_sale")
                  .map((item, index) => (
                    <Card
                      key={index}
                      id={item.id}
                      img_src={item.img_url}
                      name={item.title}
                      price={item.price}
                      colors={item.colors}
                    />
                  ))}
              </div>
              <div className="flex justify-center mt-1 border-2 duration-500 rounded-2xl w-auto h-auto p-4 bg-black text-white hover:text-black hover:bg-white ">
                <button onClick={() => navigate("/on_sale")}>
                  Посмотреть все товары
                </button>
              </div>
              <Footer />
            </>
          }
        />

        <Route path="/basket" element={<Basket />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/news" element={<News />} />
        <Route path="on_sale" element={<OnSale />} />
        <Route path="/all" element={<All />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="reg" element={<RegForm />} />
      </Routes>
    </>
  );
};

export default App;
