import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }
    setError("");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-center">Вход</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Логин
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 transition-colors"
                placeholder="Введите логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 transition-colors"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn-primary w-full py-3 mt-2">
              Войти
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-5">
            Нет аккаунта?{" "}
            <button
              className="text-indigo-500 font-medium hover:underline"
              onClick={() => navigate("/reg")}
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
