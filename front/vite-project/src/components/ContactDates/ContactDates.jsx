import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import style from "./ContactDates.module.css";

export const ContactDates = () => {
  return (
    <div
      className={`${style.divBackGround} h-auto flex flex-col justify-center items-center mx-auto md:flex-row md:gap-6 px-2`}
    >
      <div className="font-semibold md:items-start">
        <h3 className="text-2xl text-green-900">Encontranos</h3>
        <ul>
          <li>
            <LocationOnIcon color="success" />
            <span>
              Rodriguez Peña 233 / 7 - C.A.B.A. Buenos Aires - CP 1020
            </span>
          </li>
          <li>
            <PhoneEnabledIcon color="success" /> <span>0800-77755222</span>
          </li>
          <li>
            <EmailIcon color="success" /> <span>info@mediclick.com.ar</span>
          </li>
          <li className="flex flex-col items-center md:items-start">
            <span className="font-semibold text-green-900">
              Seguinos en las Redes
            </span>
            <div className="flex flex-row space-x-6 md:flex md:flex-row md:gap-6 md:space-x-0">
              <FacebookIcon color="success" />
              <InstagramIcon color="success" />
            </div>
          </li>
        </ul>
      </div>
      <div className="py-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3284.2316822694365!2d-58.39430222452497!3d-34.598302557211795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sar!4v1710269666172!5m2!1sen!2sar"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={style.google_map}
        ></iframe>
      </div>
    </div>
  );
};
