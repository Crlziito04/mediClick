//import { AppDataSource } from "../config/data-source";
import credentialDto from "../dto/credentialDto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { CredentialRepo, UserRepo } from "../repositories/repositories";
import dataError from "./utils/errors/dataError";
import { UUID } from "crypto";

export const credentialService = {
  createCredential: async (credential: credentialDto): Promise<UUID> => {
    const foundCredential = await CredentialRepo.findOne({
      where: {
        username: credential.username,
      },
    });
    //*Verificar si existe este Username
    if (foundCredential) throw new dataError("credential repeated", 400);
    //*Si no existe crea nueva instancia de credential
    const newCredential: Credential = new Credential();
    newCredential.username = credential.username;
    newCredential.password = credential.password;

    if (!newCredential) throw new dataError("credential not created", 400);
    const savedCredential = await CredentialRepo.save(newCredential);
    return savedCredential.id_credential as UUID;
  },
  verifyCredential: async (
    credential: credentialDto
  ): Promise<Partial<User>> => {
    const foundUsername: Credential | null = await CredentialRepo.findOne({
      where: {
        username: credential.username,
      },
    });
    if (!foundUsername) throw new dataError("username Invalid", 401);
    if (!(foundUsername.password === credential.password))
      throw new dataError("password Invalid", 401);

    const user: User | null = await UserRepo.findOne({
      where: {
        id_credential: foundUsername.id_credential as UUID,
      },
    });

    const userReturn = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      birthDate: user?.birthDate,
      nDni: user?.nDni,
    };

    return userReturn;
  },
  generarToken: () => {
    // Genración de Token con librería: jsonwebtoken
    const token = "tokenGenerado";
    return token;
  },
};
