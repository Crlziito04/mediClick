import style from "./Register.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import validateRegister from "../../helpers/validateRegister";
import ModalAlert from "../ModalAlert/ModalAlert";
import ModalRegister from "../ModalRegister/ModalRegister";

const Register = (prop) => {
  const [modalAlert, setModalAlert] = useState(null);
  const [modalRegister, setModalRegister] = useState(null);
  const [msg, setMsg] = useState("");
  const [countdown, setCountdown] = useState(1);
  const [data, setData] = useState({
    name: "",
    email: "",
    birthDate: "",
    nDni: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    birthDate: "",
    nDni: "",
    username: "",
    password: "",
  });

  const handleModalRegister = () => {
    setModalRegister(null);
    setMsg("");
  };

  const handleAlert = () => {
    setModalAlert(null);
    setMsg("")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    setErrors(
      validateRegister({
        ...data,
        [name]: value.trim(),
      })
    );
  };

  useEffect(() => {
    if (modalRegister === true) {
      const timeDown = setTimeout(() => {
        setCountdown((countdown) => countdown - 1);
        if (countdown === 1) {
          prop.setRegister(true);
          setModalRegister(null);
          setMsg("");
        }
      }, 1000);
      return () => clearTimeout(timeDown);
    }
  }, [countdown, modalRegister, prop]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/users/register", data)
      .then((response) => {
        setMsg(response.data.name);
        setModalRegister(true);
      })
      .catch((error) => {
        setMsg(error.response.data.error);
        setModalAlert(true);
      });

    setData({
      name: "",
      email: "",
      birthDate: "",
      nDni: "",
      username: "",
      password: "",
    });
  };
  return (
    <div className="mx-auto p-2 md:flex md:flex-col md:justify-center md:items-center">
      {modalRegister && (
        <ModalRegister
          className="mx-auto"
          handleModalRegister={handleModalRegister}
          msg={`Registro Existoso ${msg}`}
        />
      )}
      {modalAlert && <ModalAlert handleAlert={handleAlert} msg={msg} />}

      <form
        onSubmit={handleSubmit}
        action="/front/src/pages/login.html"
        className="w-[450px] mt-1 flex flex-col justify-center items-center gap-1 border-2 border-sky-500 rounded-2xl p-4 md:h-70 md:w-[500px] md:justify-between"
      >
        <legend className="font-semibold text-lg">Registrate Aqui!</legend>

        <div className="flex justify-between">
          <label className="relative" htmlFor="name">
            <input
              id="name"
              name="name"
              className={`${style.input_placeholder} p-3  outline-none`}
              type="text"
              required
              placeholder="Nombre"
              onChange={handleChange}
              value={data.name}
            />
            <ion-icon name="person-outline"></ion-icon>

            {errors.name && (
              <p style={{ color: "red", fontSize: "8px", textAlign: "center" }}>
                {errors.name}
              </p>
            )}
          </label>
          <label className="relative" htmlFor="email">
            <input
              name="email"
              id="email"
              className={`${style.input_placeholder} p-3  outline-none`}
              type="text"
              required
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
            />
            <ion-icon name="mail-outline"></ion-icon>

            {errors.email && (
              <p
                style={{
                  color: "red",
                  fontSize: "8px",
                  textAlign: "center",
                }}
              >
                {errors.email}
              </p>
            )}
          </label>
        </div>

        <div className="flex flex-row justify-around">
          <label className="relative" htmlFor="birthDate">
            <input
              name="birthDate"
              id="birthDate"
              className={`${style.input_placeholder} p-3  outline-none`}
              type="date"
              required
              placeholder="BirthDate"
              onChange={handleChange}
              value={data.birthDate}
            />

            {errors.birthDate && (
              <p style={{ color: "red", fontSize: "8px", textAlign: "center" }}>
                {errors.birthDate}
              </p>
            )}
          </label>

          <label className={`${style.dni} relative left-9`} htmlFor="nDni">
            <input
              id="nDni"
              name="nDni"
              className={`${style.input_placeholder} p-3  outline-none w-[215px]`}
              type="number"
              required
              placeholder="nDni"
              onChange={handleChange}
              value={data.nDni}
            />
            <ion-icon name="id-card-outline"></ion-icon>

            {errors.nDni && (
              <p style={{ color: "red", fontSize: "8px", textAlign: "center" }}>
                {errors.nDni}
              </p>
            )}
          </label>
        </div>

        <div className="flex justify-between">
          <label className="relative" htmlFor="username">
            <input
              id="username"
              name="username"
              className={`${style.input_placeholder} p-3  outline-none`}
              type="text"
              required
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
            />
            <ion-icon name="person-outline"></ion-icon>

            {errors.username && (
              <p style={{ color: "red", fontSize: "8px", textAlign: "center" }}>
                {errors.username}
              </p>
            )}
          </label>

          <label htmlFor="password" className="relative block">
            <input
              className={`${style.input_placeholder} p-3`}
              id="password"
              name="password"
              type="password"
              required
              placeholder="Contraseña"
              onChange={handleChange}
              value={data.password}
            />
            <ion-icon name="key-outline"></ion-icon>

            {errors.password && (
              <p style={{ color: "red", fontSize: "8px", textAlign: "center" }}>
                {errors.password}
              </p>
            )}
          </label>
        </div>

        <div className="">
          <button
            type="submit"
            disabled={Object.keys(errors).some((e) => errors[e])}
            className="group relative h-10 w-44 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white"
          >
            Registrate!
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
          </button>
        </div>
      </form>
      <div className="mt-2">
        <h4 className="text-center">
          Ya tienes cuenta?
          <button
            onClick={prop.handleRegister}
            className="text-sm text-green-500 font-bold hover:text-green-300 active:font-extrabold"
          >
            Presiona aca
          </button>
        </h4>
      </div>
    </div>
  );
};

export default Register;
