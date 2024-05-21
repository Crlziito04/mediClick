export default function validateTurn(turn) {
  const errors = {};
  const turns = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  //* DATE
  if (!turn.date) errors.date = "Ingresar Fecha de turno";
  else {
    const date = new Date(turn.date);
    const minDate = new Date();
    if (date <= minDate) errors.date = "Debe ser mayor a fecha actual";
  }

  //* PASSWORD
  if (!turn.time) errors.time = "Ingresar Hora de turno";
  else {
    if (turn.time === "scheduleChoose") errors.time = "Elegir horario";
    if (!turns.includes(turn.time)) errors.time = "Rango de horario 9-17";
  }

  return errors;
}
