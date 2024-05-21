import Turns from "../../components/Turns/Turns";
//import myTurns from "../../helpers/MyTurns";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import RestartAlt from "@mui/icons-material/RestartAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { FormTurns } from "../../components/FormTurns/FormTurns";
import { setAppointments } from "../../Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MisTurnos() {
  
  const userId = useSelector((state) => state.userData?.user?.user?.id);
  const userName = useSelector((state) => state.userData?.user?.user?.name);

  console.log(userId, "mi id");

  const navigate = useNavigate();

  useEffect(() => {
    !userId && navigate("/");
  }, [userId, navigate]);

  const userAppointments = useSelector(
    (state) => state.userData.userAppointments
  );
  const [filterStatus, setFilterStatus] = useState(null);
  const [showFormAppointment, setshowFormAppointment] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userId}`).then((res) => {
      const userAppointments = res.data.appointments;
      console.log(userAppointments, "userAppointments");

      dispatch(setAppointments(userAppointments));
    });
  }, [filterStatus, dispatch, userId]);

  //*Filtrar turno si esta activo o cancellado
  const filteredAppointments = filterStatus
    ? userAppointments.filter((turn) => turn.status === filterStatus)
    : userAppointments;

  //*Ordenar de menor a mayor por fecha
  const sortedAppointments = [...filteredAppointments].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const filterByStatus = (status) => {
    setFilterStatus(status);
  };
  const filterReset = () => {
    setFilterStatus(null);
  };

  //*Mostrar FormTurn
  const clickHandler = () => {
    setshowFormAppointment((showFormAppointment) => !showFormAppointment);
  };

  //*Eliminar turno en turns
  const handleCancelTurn = (turnId) => {
    axios
      .put(`http://localhost:3000/appointments/cancel/${turnId}`)
      .then((response) => response.data)
      .then(() => {
        axios
          .get(`http://localhost:3000/users/${userId}`)
          .then((response) => response.data.appointments)
          .then((appointments) => dispatch(setAppointments(appointments)))
          .catch((error) => console.log(error.message));
      })
      .catch((error) => alert(`${error.message}, error al reservar ${turnId}`));
  };

  return (
    <div className="mt-6 w-[85vw] min-h-[95vh] h-full md:w-[55vw] mx-auto ">
      <h1 className="text-center text-4xl text-green-600 font-semibold">
        Turnos del usuario
      </h1>
      <h2 className="text-center text-xl text-[#007AC2] font-semibold">
        Nuevo Turno
        <button onClick={clickHandler}>
          {<AddBoxIcon fontSize="large" />}
        </button>
      </h2>
      {showFormAppointment ? (
        <FormTurns
          setshowFormAppointment={setshowFormAppointment}
        />
      ) : null}

      <div className="p-3 flex justify-center space-x-4">
        <Button
          startIcon={<CheckCircleOutlineIcon />}
          variant="contained"
          color="success"
          onClick={() => filterByStatus("active")}
        >
          Activos
        </Button>

        <Button
          startIcon={<CancelIcon />}
          variant="contained"
          color="error"
          onClick={() => filterByStatus("cancelled")}
        >
          Cancelados
        </Button>

        <Button
          startIcon={<RestartAlt />}
          variant="contained"
          color="inherit"
          onClick={filterReset}
        >
          Todos
        </Button>
      </div>
      <div className="mt-2 flex flex-row flex-wrap justify-center items-center gap-5 p-8 bg-[#007AC2] w-auto rounded">
        {filteredAppointments.length === 0 && (
          <p className="text-white text-center text-2xl">No hay turnos </p>
        )}

        {sortedAppointments.map((turn) => (
          <Turns
            key={turn.id}
            id={turn.id}
            date={turn.date}
            time={turn.time}
            status={turn.status}
            user={userName}
            handleCancelTurn={handleCancelTurn}
          />
        ))}
      </div>
    </div>
  );
}
