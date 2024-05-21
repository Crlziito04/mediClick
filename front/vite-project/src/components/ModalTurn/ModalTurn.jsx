import FmdBadIcon from "@mui/icons-material/FmdBad";
import ModalAlert from "../ModalAlert/ModalAlert";
import { useState } from "react";

export const ModalTurn = (prop) => {
  const [cancelTurn, setCancelTurn] = useState(false);

  const confirmCancelTurn = () => {
    const turnDateObj = new Date(prop.date);
    const today = new Date();
    const timeDif = turnDateObj.getTime() - today.getTime();
    const hoursDif = timeDif / (1000 * 60 * 60);

    if (hoursDif > 24) {
      prop.handleCancelTurn(prop.id);
      prop.setModalDeleteTurn(false);
      prop.setNewStatus("cancelled");
    } else {
      setCancelTurn(true);
    }
  };

  const salirTurn = () => {
    prop.setModalDeleteTurn(false);
  };

  const handleAlert = () => {
    setCancelTurn(false);
    salirTurn();
  };

  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-10 min-h-[95vh] h-screen">
      {cancelTurn && (
        <ModalAlert
          handleAlert={handleAlert}
          msg={"Turno no es posible cancelar"}
        />
      )}
      <div className="bg-white px-16 py-14 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Borrar Turno?
          <FmdBadIcon color="warning" />
        </h1>
        <button
          onClick={confirmCancelTurn}
          className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
        >
          Si
        </button>
        <button
          onClick={salirTurn}
          className="bg-[#007AC2] px-4 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          No
        </button>
      </div>
    </div>
  );
};
