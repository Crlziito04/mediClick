export default function validateUser(data) {
  const errors = {};

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
