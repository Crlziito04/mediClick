import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export const H2 = () => {
  return (
    <div className="w-[80%] mx-auto text-xl mb-3">
      <p className=" p-3">
        Ofrecemos distintos recursos y beneficios para asegurar la comodidad de
        nuestros profesionales y la agilidad en las gestiones que deban realizar
        en el Sanatorio.
      </p>
      <ul className="flex flex-col gap-5">
        <li className="flex gap-4">
          <LocalParkingIcon color="success" />
          <p>Estacionamiento sin cargo*.</p>
        </li>
        <li className="flex gap-4">
          <ContactEmergencyIcon color="success" />
          <p>
            Línea Telefónica exclusiva (para médicos acreditados)
            <span className="font-semibold">(011) 3752-8150</span>.
          </p>
        </li>
        <li className="flex gap-4">
          <ThumbUpAltIcon color="success" />
          <p>Confortable Estar Médico.</p>
        </li>
      </ul>
    </div>
  );
};
