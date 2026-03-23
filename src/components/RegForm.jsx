import { useNavigate } from "react-router-dom";
import { useState } from "react";
const RegForm = () => {
  const navigate = useNavigate();
  const [tel,setTel] = useState(Number)
  const [name,setName] = useState("")
  const [pwd,setPwd] = useState("")
  return (
    <div>
      <div className="items-center justify-center flex mx-auto container mt-20">
        <div className="h-120 w-84 bg-black text-white grid items-center justify-center text-center rounded-2xl p-5">
          <div className="text-4xl font-bold">Регистрация</div>
          <div>Ваш номер телефона</div>
          <input type="tel" className="h-12 bg-white w-76" />
          <div>Ваша имя</div>
          <input type="text" className="h-12 w-76 bg-white" />
          <div>Логин</div>
          <input type="text" className="h-12 bg-white w-76" />
          <div>Пароль</div>
          <input type="passwor" className="h-12 w-76 bg-white" />
          <button className="bg-white text-black p-4 rounded-2xl mt-2.5">
            Зарегистрироваться
          </button>
          <button className="mt-2.5" onClick={() => navigate(`/login`)}>
            Войти{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegForm;
