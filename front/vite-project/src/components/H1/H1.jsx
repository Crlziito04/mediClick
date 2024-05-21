import style from "./H1.module.css";
export const H1 = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3 place-content-center">
      <div
        className={`${style.bgSer} place-items-end flex flex-col md:text-pretty text-center`}
      >
        <h2 className="w-full mt-3 mb-3 mx-auto text-green-700 font-semibold text-4xl ">
          Servicios Profesionales
        </h2>
        <p className="text- mx-auto w-72 md:w-80 text-lg text-green-600">
          Ofrecemos distintos recursos y beneficios para asegurar la comodidad
          de nuestros profesionales y la agilidad en las gestiones que deban
          realizar en el Sanatorio.
        </p>
      </div>
      <div className="">
        <img
          className="min-h-60 w-full"
          src="../../../public/h1.jpg"
          alt="h1"
        />
      </div>
    </div>
  );
};
