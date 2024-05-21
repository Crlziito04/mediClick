import style from "./Vision.module.css";

export default function Vision() {
  return (
    <div className="flex flex-col gap-3 p-6 mx-auto md:w-[80%] md:flex md:flex-col md:justify-center md:items-center h-80">
      <div className="flex flex-col mx-auto gap-5 md:flex md:flex-row md:space-x-56 md:items-start">
        <div className="w-96 md:w-auto">
          <h3 className="relative text-3xl text-center">
            <span className={style.vision}>Vision</span>
          </h3>
        </div>
        <p className="text-center w-96 text-xl md:ml-4">
          Ser líderes en Argentina brindando servicios y soluciones en Medicina
          Laboral.
        </p>
      </div>

      <div className="md:bg-black md:border-b-2 md:w-full"></div>

      <div className="flex flex-col mx-auto gap-5 md:flex md:flex-row md:space-x-56 md:items-start">
        <div className="w-96 md:w-auto">
          <h3 className="relative text-3xl text-center">
            <span className={style.vision2}>Mision</span>
          </h3>
        </div>
        <p className="text-center w-96 text-xl">
          Brindar servicios de la más alta calidad, basados en la excelencia de
          nuestros equipos de profesionales, instalaciones y aparatología..
        </p>
      </div>
    </div>
  );
}
