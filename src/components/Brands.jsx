import { useNavigate } from "react-router-dom";
export default function Brands({ brands = [] }) {
  const navigate = useNavigate();
  return (
    <div className="flex mx-auto container gap-12 flex-wrap justify-centerflex text-center items-center justify-center">
      {brands.map((item, index) => (
        <div key={index} className="flex-col  cursor-pointer ">
          <img
            src={item.logo}
            alt={item.brand.replace(/,/g, " ").toLowerCase().trim()}
            className="w-36 h-36 object-contain flex text-center items-center justify-center"
            style={{ backgroundSize: "cover" }}
            onClick={() =>
              navigate(
                `/brand/${item.brand.replace(/,/g, " ").toLowerCase().trim()}`,
              )
            }
          />
        </div>
      ))}
    </div>
  );
}
