import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiConnection from "../utils/axios";

function Login() {
  const [login, setLogin] = useState({
    email: "admin@email.com",
    password: "adm123",
  });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const {
        data: { data },
      } = await apiConnection.post("/login", login);
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          userId: data.user.id,
          username: data.user.name,
        })
      );
      navigate("/");
    } catch (error: any) {
      setLoginError(error.response.data.message);
    }
  };

  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (user && user !== "") {
      navigate("/");
    }
  };

  useEffect(() => checkUser(), []);
  const inputStyle = "p-2 focus:outline-none mb-2 w-full rounded-sm";

  return (
    <section className="flex flex-col justify-center items-center h-screen w-fullbg-zinc-100">
      <h1 className="text-3xl mb-4 font-bold text-indigo-900">
        Sistema de Protocolos
      </h1>
      <div className="flex flex-col justify-center items-center border-2 border-indigo-500 rounded-sm bg-indigo-200 p-10 w-1/4 h-1/4">
        <input
          className={inputStyle}
          type="text"
          placeholder="Email"
          name="email"
          value={login.email}
          onChange={handleChange}
        />
        <input
          className={inputStyle}
          type="password"
          placeholder="Senha"
          name="password"
          value={login.password}
          onChange={handleChange}
        />
        <span className="text-sm text-rose-500 font-medium mb-2">
          {loginError}
        </span>
        <button
          type="button"
          onClick={handleLogin}
          className="p-2 rounded-sm bg-emerald-500 font-medium text-white w-full"
        >
          Entrar
        </button>
      </div>
    </section>
  );
}

export default Login;
