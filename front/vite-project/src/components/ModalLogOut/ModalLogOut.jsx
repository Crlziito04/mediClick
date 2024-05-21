import FmdBadIcon from "@mui/icons-material/FmdBad";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin, setAppointments } from "../../Redux/userSlice";

export const ModalLogOut = (prop) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmLogOut = () => {
    prop.setStateLogOut(false);
    dispatch(userLogin({}));
    dispatch(setAppointments([]));
    navigate("/");
  };

  const cancelLogOut = () => {
    prop.setStateLogOut(false);
  };

  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-20 min-h-[95vh] h-screen">
      <div className="bg-white px-16 py-14 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Desea Salir?
          <FmdBadIcon color="warning" />
        </h1>
        <button
          onClick={confirmLogOut}
          className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
        >
          Salir
        </button>
        <button
          onClick={cancelLogOut}
          className="bg-[#007AC2] px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
