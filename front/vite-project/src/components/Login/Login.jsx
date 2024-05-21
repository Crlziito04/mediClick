import style from "./Login.module.css";
import validateUser from "../../helpers/validateLogin";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalRegister from "../ModalRegister/ModalRegister";
import ModalAlert from "../ModalAlert/ModalAlert";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = (prop) => {
  const usuario = useSelector((state) => state.userData);
  console.log(usuario.user.login, "Login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalAlert, setModalAlert] = useState(null);
  const [modalRegister, setModalRegister] = useState(null);
  const [msg, setMsg] = useState("");
  const [countdown, setCountdown] = useState(2);

  //*Iniciar en "" inputsForm
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  //*3seg despues de login
  useEffect(() => {
    if (usuario.user.login === true) {
      const timeDown = setTimeout(() => {
        setCountdown((countdown) => countdown - 1);
        if (countdown === 1) {
          setModalRegister(true);
          navigate("/home");
        }
      }, 1000);
      return () => clearTimeout(timeDown);
    }
  }, [usuario.user.login, countdown, navigate]);

  const handleModalRegister = () => {
    setModalRegister(null);
  };

  const handleAlert = () => {
    setModalAlert(null);
  };

  //*Eventos change de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    setErrors(
      validateUser({
        ...data,
        [name]: value.trim(),
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const credential = {
      credential: { username: data.username, password: data.password },
    };
    axios
      .post("http://localhost:3000/users/login", credential)
      .then(({ data }) => {
        setMsg(data.user.name);
        setModalRegister(true);
        dispatch(userLogin(data));
      })
      .catch((error) => {
        setMsg(error.response.data.error);
        setModalAlert(true);
      });
    setData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="w-auto mx-auto p-4 md:flex md:flex-col md:justify-center md:items-center">
      {modalRegister && (
        <ModalRegister
          handleModalRegister={handleModalRegister}
          msg={`Bienvenido ${msg}`}
        />
      )}
      {modalAlert && <ModalAlert handleAlert={handleAlert} msg={msg} />}

      <form
        onSubmit={handleSubmit}
        action=""
        className="w-64 mt-1 flex flex-col justify-center items-center gap-1 border-2 border-sky-500 rounded-2xl p-4 md:h-64 md:w-72 md:justify-between"
      >
        <legend className="font-semibold text-lg">Ingresa Aqui!</legend>
        <label className="relative" htmlFor="user">
          <input
            value={data.username}
            name="username"
            id="user"
            className={`${style.input_placeholder} p-3  outline-none`}
            type="text"
            required
            placeholder="Usuario"
            onChange={(e) => handleChange(e)}
          />
          <ion-icon name="person-outline"></ion-icon>

          <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
            {errors.username ? errors.username : null}
          </p>
        </label>

        <label htmlFor="password" className="relative block">
          <input
            value={data.password}
            onChange={(e) => handleChange(e)}
            name="password"
            className={`${style.input_placeholder} p-3`}
            id="password"
            type="password"
            required
            placeholder="Contraseña"
          />
          <ion-icon name="key-outline"></ion-icon>

          <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
            {errors.password ? errors.password : null}
          </p>
        </label>

        <button
          type="submit"
          className="group relative h-10 w-44 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white"
          disabled={errors.name || errors.email || errors.password}
        >
          Enviar!
          <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>
      </form>
      <div className="mt-2">
        <h4 className="text-center">
          Si olvidaste contraseña?
          <a href="./src//pages/resetPass.html">
            <span className="text-sm text-green-500 font-bold hover:text-green-300 active:font-extrabold">
              Presiona aca
            </span>
          </a>
        </h4>
        <h4 className="text-center ">
          Todavia no tienes cuenta?
          <button
            onClick={prop.handleLogin}
            className="text-sm text-green-500 font-bold hover:text-green-300 active:font-extrabold"
          >
            Registrare aca
          </button>
        </h4>
      </div>
    </div>
  );
};
export default Login;
