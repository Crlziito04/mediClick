import Joi = require("joi");
import { Request, Response, NextFunction } from "express";
import credentialDto from "../../../dto/credentialDto";

export const validateLogin = {
  validateDataUser: (
    req: Request<{ credential: credentialDto }>,
    res: Response,
    next: NextFunction
  ) => {
    const { credential } = req.body;
    const { username, password } = credential;
    console.log(req.body, "estoy en middleware");
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
};
