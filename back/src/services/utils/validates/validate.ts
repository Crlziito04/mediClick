import Joi = require("joi");
import { Request, Response, NextFunction } from "express";
//import turnsDto from "../../../dto/turnsDto";

const schemaId = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
});
export const validate = {
  validateId: (req: Request, res: Response, next: NextFunction) => {
    const id = req.params;
    const validation = schemaId.validate(id);
    if (validation.error) {
      console.log(validation.error);
      next({ message: "ID invalido, debe ser UUID", statusCode: 400 });
    } else {
      console.log("Objeto válido");
      next();
    }
  },
  validateDataUser: (
    req: Request<{
      name: string;
      email: string;
      birthDate: Date;
      nDni: number;
      username: string;
      password: string;
    }>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, birthDate, nDni, username, password } = req.body;

    //! Validar 'name'
    const nameValidation = Joi.string()
      .pattern(new RegExp("^[A-Za-z]+$"))
      .required()
      .validate(name);
    if (nameValidation.error) {
      console.log(nameValidation.error);
      return next({
        message: "Nombre incorrecto, debe contener solo letras",
        statusCode: 400,
      });
    }

    //! Validar 'email'
    const emailValidation = Joi.string().email().required().validate(email);
    if (emailValidation.error) {
      console.log(emailValidation.error);
      return next({
        message: "Correo electrónico no existe o incorrecto",
        statusCode: 400,
      });
    }

    //! Validar 'birthDate'
    const birthDateValidation = Joi.date()
      .max("now")
      .required()
      .validate(birthDate);
    if (birthDateValidation.error) {
      console.log(birthDateValidation.error);
      return next({
        message: "Fecha de nacimiento incorrecta",
        statusCode: 400,
      });
    }

    //! Validar 'nDni'
    const nDniValidation = Joi.number()
      .integer()
      .min(1000000)
      .required()
      .validate(nDni);
    if (nDniValidation.error) {
      console.log(nDniValidation.error);
      return next({
        message:
          "Número de DNI incorrecto, debe ser un número entero mayor a 1000000",
        statusCode: 400,
      });
    }

    //! Validar 'username'
    const usernameValidation = Joi.string()
      .alphanum()
      .min(6)
      .max(30)
      .required()
      .validate(username);
    if (usernameValidation.error) {
      console.log(usernameValidation.error);
      return next({
        message:
          "Nombre de usuario incorrecto, debe contener solo caracteres alfanuméricos con una longitud de 6 a 30",
        statusCode: 400,
      });
    }

    //! Validar 'password'
    const passwordValidation = Joi.string()
      .min(6)
      .max(20)
      .required()
      .validate(password);
    if (passwordValidation.error) {
      console.log(passwordValidation.error);
      return next({
        message:
          "Contraseña incorrecta, debe contener con una longitud de 6 a 20",
        statusCode: 400,
      });
    }

    console.log("Datos correctos");
    next();
  },
  validateDataAppointment: (
    req: Request<{
      date: Date;
      time: string;
      status: string;
      id: string;
    }>,
    res: Response,
    next: NextFunction
  ) => {
    // const { turn } = req.body;
    // console.log(req.body);
    const { date, time, status, id } = req.body;
    console.log(req.body);
    const validateDate = Joi.date().greater("now").required().validate(date);
    if (validateDate.error) {
      return next({
        message: "Ingrese una fecha mayor a la actual",
        statusCode: 400,
      });
    }

    const timeValidate = Joi.string()
      .pattern(
        /^(09:00|09:30|10:00|10:30|11:00|11:30|12:00|12:30|13:00|13:30|14:00|14:30|15:00|15:30|16:00|16:30|17:00)$/
      )
      .required()
      .validate(time);
    if (timeValidate.error) {
      return next({
        message: "Ingrese hora entre 09:00 a 17:00, rangos por 00:30",
        statusCode: 400,
      });
    }
    const statusValidate = Joi.string()
      .valid("active")
      .default("active")
      .required()
      .validate(status);
    if (statusValidate.error) {
      return next({
        message: "Active",
        statusCode: 400,
      });
    }
    const validateId = Joi.string().guid({ version: "uuidv4" }).required();
    const validation = validateId.validate(id);
    if (validation.error) {
      return next({ message: "ID invalido, debe ser UUID", statusCode: 400 });
    }
    console.log("Datos correctos,pasamos a controller");
    next();
  },
};
// validateToken: (req: Request, res: Response, next: NextFunction) => {
//   const { token } = req.body;
//   if (token === "tokenGenerado") {
//     next();
//   } else {
//     res.status(401).json({ message: "Acceso denegado. Token inválido!!!" });
//   }
// },
// const dateValidate = Joi.date()
//   .greater("now")
//   .custom((value, helpers) => {
//     // Validar que la fecha sea un día de la semana de lunes a viernes (0 a 4)
//     if (value.getDay() < 1 || value.getDay() > 5) {
//       return helpers.error("any.invalid");
//     }
//     return value;
//   })
//   .required()
//   .validate(date);
// if (dateValidate.error) {
//   return next({
//     message: "Fecha invalida, debe ser de lunes a viernes",
//     statusCode: 400,
//   });
// }
