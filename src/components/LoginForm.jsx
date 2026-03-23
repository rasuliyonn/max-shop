import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="items-center justify-center flex mx-auto container mt-20">
      <div className="h-90 w-84 bg-black text-white grid items-center justify-center text-center rounded-2xl p-5">
        <div className="text-4xl font-bold">Авторизация</div>
        <div>Логин</div>
        <input
          type="text"
          className="h-12 bg-white w-76 text-black p-2"
          value={login}
          defaultValue={""}
          onChange={(e) => setLogin(e.target.value)}
        />
        <div>Пароль</div>
        <input
          type="passwor"
          className="h-12 w-76 bg-white text-black p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-white text-black p-4 rounded-2xl mt-2.5">
          Войти
        </button>
        <button className="mt-2.5" onClick={() => navigate(`/reg`)}>
          Зарегистрироваться{" "}
        </button>
      </div>
    </div>
  );
};
export default LoginForm;
