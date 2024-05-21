import { credentialService } from "./credentialService";
import { userDto } from "../dto/userDto";
import credentialDto from "../dto/credentialDto";
import dataError from "./utils/errors/dataError";
//import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { UUID } from "crypto";
import { UserRepo } from "../repositories/repositories";

export const userService = {
  returnUsers: async (): Promise<User[]> => {
    const users = await UserRepo.find({
      relations: { appointments: true },
    });
    if (!users) throw new dataError("USERS Not Found", 404);
    return users;
  },
  //! boom?
  //! Passport, JWT.
  returnUserById: async (id: string): Promise<User> => {
    const foundUser = await UserRepo.findOne({
      where: {
        id: id,
      },
      relations: ["appointments"],
    });
    if (!foundUser) {
      throw new dataError("USER NOT FOUND", 404);
    }
    return foundUser;
  },
  createUser: async (user: userDto, credential: credentialDto) => {
    const verifyEmail = await UserRepo.findOne({
      where: {
        email: user.email,
      },
    });
    console.log(verifyEmail);
    //*Verificar si existe email
    if (verifyEmail) throw new dataError("EMAIL DUPLICATED", 400);

    const credentialId: UUID =
      await credentialService.createCredential(credential);
    const newUser: User = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.birthDate = user.birthDate;
    newUser.nDni = user.nDni;
    newUser.id_credential = credentialId;

    const savedNewUser = await UserRepo.save(newUser);
    if (!savedNewUser) throw new dataError("User not created", 400);
    return savedNewUser;
  },
};

// AppDataSource.manager.save(newUser);
