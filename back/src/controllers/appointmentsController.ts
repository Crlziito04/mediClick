import { Request, Response } from "express";
import { turnsService } from "../services/turnsService";
//import turnsDto from "../dto/turnsDto";
import dataError from "../services/utils/errors/dataError";

const appointmentsController = {
  getAppointments: async (req: Request, res: Response): Promise<void> => {
    try {
      const appointments = await turnsService.returnAppointments();
      res.json(appointments);
    } catch (err) {
      if (err instanceof dataError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
  getAppointmentById: async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const appointmentById = await turnsService.detailTurn(id);
      res.json(appointmentById);
    } catch (err) {
      if (err instanceof dataError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
  postSchedule: async (
    req: Request<{ date: Date; time: string; status: string; id: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const { date, time, status, id } = req.body;
      const turn = { date, time, status, id };
      console.log("estoy en controoller", turn);
      const newTurn = await turnsService.createTurn(turn);
      res.status(201).json({ message: "Turno Creado", newTurn });
    } catch (err) {
      if (err instanceof dataError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
  cancelAppointment: async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const cancelTurn = await turnsService.cancelTurn(id);
      res.json({ cancelTurn });
    } catch (err) {
      if (err instanceof dataError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
};
export default appointmentsController;
