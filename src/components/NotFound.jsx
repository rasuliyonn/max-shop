import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
      <h1 className="text-3xl font-bold mb-3">Страница не найдена</h1>
      <p className="text-gray-500 mb-8">
        Такой страницы не существует или она была перемещена
      </p>
      <button className="btn-primary" onClick={() => navigate("/")}>
        Вернуться на главную
      </button>
    </div>
  );
};

export default NotFound;
