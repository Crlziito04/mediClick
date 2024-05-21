export default function validateRegister(data) {
  const errors = {};
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  //* NAME
  data.name = data.name.trim();
  if (!data.name) errors.name = "Debe ingresar usuario";
  else {
    if (data.name.length < 3) errors.name = "Nombre de al menos 5 caracteres";
    if (data.name.length > 30) errors.name = "Nombre de máximo 30 caracteres";
    if (!/^[a-zA-Z0-9]+$/.test(data.name))
      errors.name = "Debe contener solo letras";
  }

  //*EMAIL

  if (!data.email) errors.email = "Debe ingresar el email";
  else {
    if (emailRegex.test(data.username))
      errors.email = "Formato de email invalido";
  }

  //*birthDate
  if (!data.birthDate) errors.birthDate = "Ingresar Fecha de nacimiento";
  else {
    const birthDate = new Date(data.birthDate);
    const minDate = new Date("1920-01-01"); // Fecha mínima permitida
    const maxDate = new Date(); // Fecha actual

    if (birthDate < minDate || birthDate >= maxDate) {
      errors.birthDate =
        "La fecha de nacimiento debe estar entre 1920 y la fecha actual";
    }
  }

  //*nDNi
  if (!data.nDni) errors.nDni = "Ingresar DNI";
  else {
    const parsedNumber = parseInt(data.nDni, 10);
    if (isNaN(parsedNumber)) {
      errors.nDni = "Debe ingresar un número válido";
    } else if (parsedNumber % 1 !== 0) {
      errors.nDni = "Debe ingresar un número entero";
    }
  }

  //* USERNAME
  data.username = data.username.trim();
  if (!data.username) errors.username = "Debe ingresar usuario";
  else {
    if (data.username.length < 3)
      errors.username = "Nombre de al menos 5 caracteres";
    if (data.username.length > 30)
      errors.username = "Nombre de máximo 30 caracteres";
  }

  //* PASSWORD
  if (!data.password) errors.password = "Debe ingresar una contraseña";
  else {
    if (data.password.length < 6)
      errors.password = "Contraseña de al menos 6 caracteres";
    if (data.password.length > 20)
      errors.password = "Contraseña de máximo 20 caracteres";
  }

  return errors;
}
