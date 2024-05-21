//import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import dataError from "./utils/errors/dataError";
import { userService } from "./userService";
import { AppointmentRepo } from "../repositories/repositories";

export const turnsService = {
  returnAppointments: async (): Promise<Appointment[]> => {
    const turns = await AppointmentRepo.find({
      relations: { user: true },
    });
    if (!turns) throw new dataError("TURNS Not Found", 404);
    return turns;
  },
  detailTurn: async (id: string): Promise<Appointment | null> => {
    const foundTurn = await AppointmentRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!foundTurn) {
      throw new dataError("Turns not Found", 404);
    }
    return foundTurn;
  },
  createTurn: async ({
    date,
    time,
    status,
    id,
  }: {
    date: Date;
    time: string;
    status: string;
    id: string;
  }): Promise<Appointment> => {
    const turn = { date, time, status, id };
    const user = await userService.returnUserById(turn.id);
    if (!user) throw new dataError("User not found", 404);

    const newTurn: Appointment = await AppointmentRepo.create({
      date: turn.date,
      time: turn.time,
      status: turn.status,
      user: user,
    });

    const savedTurn = await AppointmentRepo.save(newTurn);
    if (!newTurn) throw new dataError("Turn not created", 400);
    return savedTurn;
  },
  cancelTurn: async (id: string) => {
    const foundTurn = await turnsService.detailTurn(id);
    console.log(foundTurn);
    if (!foundTurn) {
      throw new dataError("Turn Not Found", 404);
    }
    const cancelTurns = await AppointmentRepo.update(foundTurn.id, {
      status: "cancelled",
    });
    return cancelTurns;
  },
};
