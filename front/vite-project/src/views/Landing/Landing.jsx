import Mediclick from "../../components/Mediclick/Mediclick";
import Login from "../../components/Login/Login";
import Register from "../../components/Rergister/Register";
import { useState } from "react";

const Landing = () => {
  //*Alternar Register/Login
  const [register, setRegister] = useState(true);

  const handleLogin = () => {
    setRegister(false);
  };

  const handleRegister = () => {
    setRegister(true);
  };

  return (
    <>
      <div className="h-auto grid md:grid-cols-[1fr_550px]">
        <Mediclick />
        {register ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <Register handleRegister={handleRegister} setRegister={setRegister} />
        )}
      </div>
    </>
  );
};
export default Landing;
