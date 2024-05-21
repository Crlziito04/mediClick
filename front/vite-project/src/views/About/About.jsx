import AboutImg from "../../components/AboutImg/AboutImg";
import AboutImg2 from "../../components/AboutImg2/AboutImg2";

import Vision from "../../components/Vision/Vision";
import style from "./About.module.css";

export const About = () => {
  return (
    <div className={style.bgAbout}>
      <AboutImg />
      <div className="bg-white h-8 w-full"></div>
      <AboutImg2 />
      <Vision />
      <div className="bg-white h-20 md:h-0 w-full"></div>
    </div>
  );
};
