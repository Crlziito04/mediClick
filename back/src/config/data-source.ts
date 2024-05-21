import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from "./envs";

const host = DB_HOST || "localhost";
const port = DB_PORT ? parseInt(DB_PORT) : 5432;
const username = DB_USERNAME || "";
const password = DB_PASSWORD || "";
const database = DB_DATABASE || "";

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  //dropSchema: true,
  logging: ["error"],
  entities: [User, Credential, Appointment],
  subscribers: [],
  migrations: [],
});
