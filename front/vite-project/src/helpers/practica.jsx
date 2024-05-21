import { useState } from "react";

const NewComponent = () => {
  //*Estados compuestos
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
  });

  //*Usando State
  state.value;
  //*Usar el set
  setState({
    ...state,
    value: "carlos",
  });
};
export { NewComponent };
