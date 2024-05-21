export default function AboutImg() {
  return (
    <div className="w-full mx-auto flex flex-col gap-4 md:flex md:flex-row md:justify-center py-3 bg-[#ADD3C9]">
      <div className="w-full md:w-[40%] md:mt-14 px-2">
        <h1 className="text-5xl font-mono  p-5 text-green-700 font-bold ">
          Quienes Somos?
        </h1>
        <p className="font-semibold text-green-700">
          Somos una empresa de Medicina Laboral con vocación de servicio, que
          ofrece soluciones en el rubro a otras empresas brindando una cobertura
          médica adecuada, confiable, eficiente y oportuna
        </p>
      </div>

      <img
        className="w-full min-h-[200px] max-h-[350px] md:w-[40%]"
        src="../../../public/about1.jpg"
        alt=""
      />
    </div>
  );
}
