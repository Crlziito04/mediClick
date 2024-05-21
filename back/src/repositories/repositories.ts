import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";

export const UserRepo = AppDataSource.getRepository(User);
export const AppointmentRepo = AppDataSource.getRepository(Appointment);
export const CredentialRepo = AppDataSource.getRepository(Credential);
