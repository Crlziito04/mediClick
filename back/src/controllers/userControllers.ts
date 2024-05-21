import { Request, Response } from "express";
import { userService } from "../services/userService";
import { userDto } from "../dto/userDto";
import { credentialService } from "../services/credentialService";
import credentialDto from "../dto/credentialDto";
import dataError from "../services/utils/errors/dataError";

const userController = {
  getUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.returnUsers();
      res.json(users);
    } catch (err) {
      if (err instanceof dataError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
  getUserById: async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.params.id;
      const foundUser = await userService.returnUserById(userId);
      res.json(foundUser);
    } catch (err) {
      console.log(err);
      if (err instanceof dataError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
  postRegister: async (
    req: Request<{
      name: string;
      email: string;
      birthDate: Date;
      nDni: number;
      username: string;
      password: string;
    }>,
    res: Response
  ): Promise<void> => {
    try {
      const { name, email, birthDate, nDni, username, password } = req.body;
      console.log(req.body);
      const user: userDto = { name, email, birthDate, nDni };
      const credential: credentialDto = { username, password };
      const newRegister = await userService.createUser(user, credential);
      res.status(201).json(newRegister);
    } catch (err) {
      if (err instanceof dataError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
  postLogin: async (
    req: Request<{ credential: credentialDto }>,
    res: Response
  ): Promise<void> => {
    try {
      const { credential } = req.body;

      console.log("estoy aqui", credential);
      const user = await credentialService.verifyCredential(credential);
      res.status(200).json({ login: true, user });
    } catch (err) {
      if (err instanceof dataError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
};

export default userController;
