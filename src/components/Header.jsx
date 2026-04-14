import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { useCartStore } from "../managment/useBasket";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const carts = useCartStore((state) => state.carts);
  const products = useCartStore((state) => state.product);
  const cartsCount = carts.length;
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const searchResults =
    searchQuery.trim().length > 1
      ? products
          .filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleSearchSelect = (product) => {
    navigate(`/product/${product.id}`, {
      state: {
        id: product.id,
        img_src: product.img_url,
        name: product.title,
        price: product.price,
        colors: product.colors,
        category: product.category,
        sizes: product.sizes,
        brand: product.brand,
        characteristics: product.characteristics,
        description: product.description,
      },
    });
    setSearchQuery("");
    setShowDropdown(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { label: "Все товары", path: "/all" },
    { label: "Распродажа", path: "/on_sale" },
    { label: "Новые товары", path: "/news" },
    {label:"Популярные товары",path:"popular"}
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div
            className="text-xl md:text-2xl font-bold cursor-pointer "
            onClick={() => navigate("/")}
          >
            Max.Shop
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm lg:text-base">
            {navLinks.map((link) => (
              <button
                key={link.path}
                className="hover:text-indigo-500 transition-colors duration-200 font-medium"
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div
            className="hidden md:block relative flex-1 max-w-xs"
            ref={searchRef}
          >
            <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
              <CiSearch className="text-gray-400 text-xl mr-2" />
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                type="text"
                className="bg-transparent outline-none text-sm w-full text-gray-800 placeholder-gray-400"
                placeholder="Искать товар..."
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowDropdown(false);
                  }}
                >
                  <IoClose className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => handleSearchSelect(product)}
                  >
                    <img
                      src={product.img_url}
                      alt={product.title}
                      className="w-10 h-10 object-cover rounded-lg "
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.price} с
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/basket")}
            >
              <SlBasket className="text-2xl" />
              {cartsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartsCount}
                </span>
              )}
            </div>
            <FaRegUserCircle
              className="text-2xl cursor-pointer hover:text-indigo-500 transition-colors"
              onClick={() => navigate("/login")}
            />
            <button
              className="md:hidden text-2xl"
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-2 border-t border-gray-100 pt-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                className="text-left text-base font-medium py-2.5 px-2 rounded-lg hover:bg-gray-50 hover:text-indigo-500 transition-colors"
                onClick={() => handleNavClick(link.path)}
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 mt-2">
              <CiSearch className="text-gray-400 text-xl mr-2 " />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
                placeholder="Искать товар..."
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <IoClose className="text-gray-400" />
                </button>
              )}
            </div>
            {searchQuery.trim().length > 1 && searchResults.length > 0 && (
              <div className="mt-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => {
                      handleSearchSelect(product);
                      setMenuOpen(false);
                    }}
                  >
                    <img
                      src={product.img_url}
                      alt={product.title}
                      className="w-10 h-10 object-cover rounded-lg "
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.price} c
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
