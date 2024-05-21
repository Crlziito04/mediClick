export const ContactImg = () => {
  return (
    <div className="w-full relative">
      <h1 className="absolute text-5xl font-mono top-24 p-5 text-green-800 font-bold max-h">
        Contacto
      </h1>
      <img
        className="w-full min-h-[200px] md:h-[450px]"
        src="../../../public/contacto.jpg"
        alt=""
      />
    </div>
  );
};
