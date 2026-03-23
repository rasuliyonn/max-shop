// Max-Shop

import Header from "./components/Header";
import Slider from "./components/Slider";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import {
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

const Home = () => {
  const navigate = useNavigate();
  const product = useCartStore((state) => state.product);
  const newProducts = product.filter((item) => item.category === "new").slice(0, 4);
  const saleProducts = product.filter((item) => item.category === "on_sale").slice(0, 4);

  return (
    <>
      <Slider />

      {/* New products section */}
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-bold">Новые товары</h2>
          <button
            className="btn-outline text-sm"
            onClick={() => navigate("/news")}
          >
            Смотреть все
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newProducts.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              img_src={item.img_url}
              name={item.title}
              price={item.price}
              colors={item.colors}
              category={item.category}
            />
          ))}
        </div>
      </div>

      {/* Sale section */}
      <div className="container mx-auto px-4 mt-16 md:mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-bold">Распродажа</h2>
          <button
            className="btn-outline text-sm"
            onClick={() => navigate("/on_sale")}
          >
            Смотреть все
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saleProducts.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              img_src={item.img_url}
              name={item.title}
              price={item.price}
              colors={item.colors}
              category={item.category}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/news" element={<News />} />
        <Route path="/on_sale" element={<OnSale />} />
        <Route path="/all" element={<All />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reg" element={<RegForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
