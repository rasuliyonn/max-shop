import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegForm = () => {
  const navigate = useNavigate();
  const [tel, setTel] = useState("");
  const [name, setName] = useState("");
  const [loginVal, setLoginVal] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tel.trim() || !name.trim() || !loginVal.trim() || !pwd.trim()) {
      setError("Заполните все поля");
      return;
    }
    setError("");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-center">Регистрация</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Номер телефона
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 transition-colors"
                placeholder="+992 000 000 000"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ваше имя
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 transition-colors"
                placeholder="Курбонов Курбон"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Логин
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 transition-colors"
                placeholder="Введите логин"
                value={loginVal}
                onChange={(e) => setLoginVal(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 transition-colors"
                placeholder="Придумайте пароль"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn-primary w-full py-3 mt-2">
              Зарегистрироваться
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-5">
            Уже есть аккаунт?{" "}
            <button
              className="text-indigo-500 font-medium hover:underline"
              onClick={() => navigate("/login")}
            >
              Войти
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegForm;
