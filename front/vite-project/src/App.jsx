import Landing from "./views/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import { Route, Routes, useLocation } from "react-router-dom";
import { About } from "./views/About/About";
import { Contact } from "./views/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";

function App() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {/* {pathname !== "/" ? <NavBar /> : null} */}
      <NavBar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="/appointments" element={<MisTurnos />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {pathname !== "/" ? <Footer /> : null}
    </>
  );
}

export default App;
