import style from "./Mediclick.module.css";

const Mediclick = () => {
  return (
    <div
      className={`${style.mediclick} flex flex-col justify-end items-center w-full h-[370px] md:h-[93vh] max-w-5xl`}
    >
      <h1 className="mb-3 text-3xl font-bold md:text-3xl md:mb-6 lg:text-4xl">
        MediClick
      </h1>
      <p className="mb-3 text-2xl font-semibold md:text-3xl md:mb-6 lg:text-4xl">
        Gestion de Turnos Online
      </p>
    </div>
  );
};
export default Mediclick;
