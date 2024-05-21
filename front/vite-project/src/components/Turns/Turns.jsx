/* eslint-disable react/prop-types */

import { useState } from "react";
import style from "./Turns.module.css";
import { ModalTurn } from "../ModalTurn/ModalTurn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Turns = ({ id, date, time, status, user, handleCancelTurn }) => {
  const [newStatus, setNewStatus] = useState(status);
  const [modalDeleteTurn, setModalDeleteTurn] = useState(false);

  const clickHandler = () => {
    setModalDeleteTurn(true);
  };

  //const [day, month, year] = date.split("-");
  //const formatDate = `${day}/${month}/${year}`;

  const formatDate = date.split("-").reverse().join("/");

  return (
    <div className="w-auto">
      {modalDeleteTurn && (
        <ModalTurn
          setNewStatus={setNewStatus}
          handleCancelTurn={handleCancelTurn}
          id={id}
          date={date}
          setModalDeleteTurn={setModalDeleteTurn}
        />
      )}
      <ul
        className="bg-white mb-3 w-40 p-5 rounded text-center flex flex-col gap-2 border-2 border-green-500 duration-300 hover:scale-105 hover:shadow-xl"
        id={id}
      >
        <li
          className={`${
            newStatus === "active" ? style.active : style.cancelled
          }`}
        >
          {newStatus === "active" ? (
            <ion-icon color={style.active} name={"checkbox-outline"}></ion-icon>
          ) : (
            <ion-icon
              color={style.active}
              name={"trash-bin-outline"}
            ></ion-icon>
          )}
        </li>

        <li
          className={`${
            newStatus === "active" ? style.active : style.cancelled
          } font-semibold`}
        >
          {newStatus === "active" ? "Activo" : "Cancelado"}
        </li>

        <li className="font-semibold">
          {newStatus === "active" ? (
            <button onClick={clickHandler}>
              <DeleteForeverIcon color="error" />
            </button>
          ) : (
            <button disabled>
              <DeleteForeverIcon color="disabled" />
            </button>
          )}
        </li>
        <li className="font-semibold">{user}</li>
        <li className="font-semibold">{formatDate}</li>
        <li className="font-semibold">{time}</li>
      </ul>
    </div>
  );
};

export default Turns;
