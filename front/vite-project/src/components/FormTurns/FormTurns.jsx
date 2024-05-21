import style from "./FormTurns.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAppointments } from "../../Redux/userSlice";
import validateTurn from "../../helpers/validateTurn";
import ModalRegister from "../ModalRegister/ModalRegister";
import ModalAlert from "../ModalAlert/ModalAlert";

export const FormTurns = (prop) => {
  //*ID user globalstate
  const userId = useSelector((state) => state.userData?.user?.user?.id);
  const dispatch = useDispatch();
  const [modalAlert, setModalAlert] = useState(null);
  const [modalRegister, setModalRegister] = useState(null);
  const [msg, setMsg] = useState("");
  const [countdown, setCountdown] = useState(1);
  const [turn, setTurn] = useState({
    date: "",
    time: "scheduleChoose",
  });
  const [errors, setErrors] = useState({
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurn({ ...turn, [name]: value });
    setErrors(validateTurn({ ...turn, [name]: value }));
  };

  const getTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getTwoMonthsAhead = () => {
    const today = new Date();
    const twoMonthsAhead = new Date(today);
    twoMonthsAhead.setMonth(twoMonthsAhead.getMonth() + 2);
    return twoMonthsAhead.toISOString().split("T")[0];
  };

  const handleModalRegister = () => {
    setModalRegister(null);
    setMsg("");
  };

  const handleAlert = () => {
    setModalAlert(null);
    setMsg("");
  };

  useEffect(() => {
    if (modalRegister === true) {
      const timeDown = setTimeout(() => {
        setCountdown((countdown) => countdown - 1);
        if (countdown === 1) {
          setModalRegister(null);
          prop.setshowFormAppointment(null);
          setMsg("");
        }
      }, 1000);
      return () => clearTimeout(timeDown);
    }
  }, [countdown, modalRegister, prop]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTurn = {
      date: turn.date,
      time: turn.time,
      status: "active",
      id: userId,
    };
    axios
      .post("http://localhost:3000/appointments/schedule", newTurn)
      .then((response) => {
        console.log(response.data.message);
        setMsg(response.data.message);
        setModalRegister(true);
        setTurn({ date: "", time: "" });
        axios
          .get(`http://localhost:3000/users/${userId}`)
          .then((response) => response.data.appointments)
          .then((appointments) => dispatch(setAppointments(appointments)))
          .catch((error) => console.log(error.response.data.error));
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setMsg(error.response.data.error);
        setModalAlert(true);
      });
  };

  return (
    <div
      className={`${style.formTurns} z-10 w-auto p-0 md:flex md:flex-col md:justify-center md:items-center bg-white  rounded-2xl`}
    >
      {modalRegister && (
        <ModalRegister
          className="mx-auto"
          handleModalRegister={handleModalRegister}
          msg={`${msg}`}
        />
      )}
      {modalAlert && <ModalAlert handleAlert={handleAlert} msg={msg} />}

      <form
        onSubmit={handleSubmit}
        action=""
        className="w-64  flex flex-col justify-center items-center gap-1 border-2 border-sky-500 rounded-2xl p-4 md:h-64 md:w-72 md:justify-between"
      >
        <legend className="font-semibold text-lg">Nuevo Turno</legend>
        <label className="relative" htmlFor="date">
          <input
            min={getTomorrow()}
            max={getTwoMonthsAhead()}
            value={turn.date}
            name="date"
            onChange={handleChange}
            id="date"
            className={`${style.input_placeholder} p-3  outline-none`}
            type="date"
            required
          />
          <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
            {errors.date ? errors.date : null}
          </p>
        </label>

        <select
          onChange={handleChange}
          value={turn.time}
          name="time"
          id="horarios"
        >
          <option value="scheduleChoose" disabled>
            Elige un Horario
          </option>
          <option value="09:00">09:00</option>
          <option value="09:30">09:30</option>
          <option value="10:00">10:00</option>
          <option value="10:30">10:30</option>
          <option value="11:00">11:00</option>
          <option value="11:30">11:30</option>
          <option value="12:00">12:00</option>
          <option value="12:30">12:30</option>
          <option value="13:00">13:00</option>
          <option value="13:30">13:30</option>
          <option value="14:00">14:00</option>
          <option value="14:30">14:30</option>
          <option value="15:00">15:00</option>
          <option value="15:30">15:30</option>
          <option value="16:00">16:00</option>
          <option value="16:30">16:30</option>
          <option value="17:00">17:00</option>
        </select>
        <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
          {errors.time ? errors.time : null}
        </p>

        <button
          disabled={Object.keys(errors).some((e) => errors[e])}
          type="submit"
          className="group relative h-10 w-44 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white"
          onClick={prop.closeHandler}
        >
          Agregar
          <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>
      </form>
    </div>
  );
};
