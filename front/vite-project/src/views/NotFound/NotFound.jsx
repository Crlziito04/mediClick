import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timeDown = setTimeout(() => {
      setCountdown((countdown) => countdown - 1);
      if (countdown === 1) navigate("/");
    }, 1000);
    return () => clearTimeout(timeDown);
  }, [countdown, navigate]);

  useEffect(
    () => () => {
      setCountdown(5);
    },
    []
  );

  return (
    <div className="mx-auto w-[70vw]  flex flex-col justify-center items-center p-2">
      <h1 className="text-5xl">404</h1>
      <hr />
      <h2 className="text-lg">No hay nada en esta URL</h2>
      <h3 className="text-lg">
        Redirigiendo a home en {countdown} segundos...
      </h3>
      <img
        className="h-52 md:h-auto"
        src="../../../public/notFound.jpg"
        alt="404 - Not Found"
      />
    </div>
  );
}
