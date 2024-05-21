import style from "./AboutImg2.module.css";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export default function AboutImg2() {
  return (
    <div className={style.bgImg}>
      <div className="flex flex-col justify-center items-center md:flex-row md:gap-3">
        <img
          src="../../../public/about2.jpg"
          alt="about2"
          className="w-full min-h-[200px] max-h-[350px] md:w-[40%]"
        />
        <div className="md:w-[50%] p-2">
          <div className="flex gap-2 items-center justify-center">
            <LocalHospitalIcon fontSize="large" color="success" />
            <h2 className="text-green-700 text-4xl font-semibold">MediClick</h2>
          </div>

          <p className="text-green-900 font-semibold text-xl px-3 mt-3">
            Ofrecemos servicios de alta calidad basados en la experiencia y la
            capacidad de nuestro equipo de profesionales.
          </p>
        </div>
      </div>
    </div>
  );
}
