import style from "./Footer.module.css";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mb-0 mt-2">
      <div className={style.container}>
        <div className={style.footer_content}>
          <div className={`${style.footer_section} ${style.about}`}>
            <h2>Información</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className={style.contact}>
              <span>
                <i className={`${style.fas} ${style.fa_phone}`}></i>
                123-456-7890
              </span>
              <span>
                <i className={`${style.fas} ${style.fa_envelope}`}></i>
                info@example.com
              </span>
            </div>
          </div>
          <div className={`${style.footer_section} ${style.links}`}>
            <h2>Enlaces</h2>
            <ul>
              <li>
                <NavLink to="/home">
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">
                  <span>About</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">
                  <span>Contacto</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
