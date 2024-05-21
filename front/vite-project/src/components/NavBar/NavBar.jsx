import style from "./NavBar.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { ModalLogOut } from "../ModalLogOut/ModalLogOut";

const NavBar = () => {
  const userLogin = useSelector((state) => state.userData.user.login);
  const [iconName, setIconName] = useState("menu");
  const [topPosition, setTopPosition] = useState("-100%");
  const [stateLogOut, setStateLogOut] = useState(false);

  const logOut = () => {
    setStateLogOut(true);
    onToggleMenu();
  };

  const onToggleMenu = () => {
    // Cambiar la propiedad name entre 'menu' y 'close'
    const newIconName = iconName === "menu" ? "close" : "menu";
    setIconName(newIconName);
    //Cambia propiedad de topposicion
    setTopPosition(newIconName === "menu" ? "-100%" : "-9%");
  };
  return (
    <nav className="mt-1 flex justify-between items-center w-[90%] mx-auto border-2 rounded">
      {stateLogOut && <ModalLogOut setStateLogOut={setStateLogOut} />}
      <div>
        <img
          className="w-10 cursor-pointer"
          src="../../../public/logo.png"
          alt="Logo"
        />
      </div>
      <div
        className={`nav-links duration-500 w-auto md:static absolute  bg-white md:min-h-fit h-64 md:h-fit left-0 md:w-auto flex items-center px-5 z-10`}
        style={{ top: topPosition }}
      >
        <ul className="flex mt-14 md:mt-0 md:flex-row flex-col md:items-center md:gap-[4vw]  gap-3">
          <li>
            <NavLink
              className={({ isActive }) => isActive && style.active}
              to="/home"
            >
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            {userLogin === true ? (
              <NavLink
                className={({ isActive }) => isActive && style.active}
                to="/appointments"
              >
                <span>Turnos</span>
              </NavLink>
            ) : (
              <NavLink
                className={({ isActive }) => isActive && style.active}
                to="/"
              >
                <span>Ingresar</span>
              </NavLink>
            )}
          </li>
          <li>
            <NavLink
              className={({ isActive }) => isActive && style.active}
              to="/about"
            >
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => isActive && style.active}
              to="/contact"
            >
              <span>Contacto</span>
            </NavLink>
          </li>
          {userLogin && (
            <li>
              <div className="cursor-pointer" onClick={logOut}>
                <span>Cerrar Sesion</span>
                <span>
                  <LogoutIcon fontSize="small" />
                </span>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div className="flex items-center gap-6 md:hidden">
        {/* <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
          Sign in
        </button> */}
        <ion-icon
          className={style}
          onClick={onToggleMenu}
          name={iconName}
        ></ion-icon>
      </div>
    </nav>
  );
};
export default NavBar;
