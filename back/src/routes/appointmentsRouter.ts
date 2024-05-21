import Router from "express";
import appointmentsController from "../controllers/appointmentsController";
import { validate } from "../services/utils/validates/validate";

const appointmentsRouter = Router();

appointmentsRouter.get("/", appointmentsController.getAppointments);

appointmentsRouter.get(
  "/:id",
  validate.validateId,
  appointmentsController.getAppointmentById
);

appointmentsRouter.post(
  "/schedule",
  validate.validateDataAppointment,
  appointmentsController.postSchedule
);

appointmentsRouter.put(
  "/cancel/:id",
  validate.validateId,
  appointmentsController.cancelAppointment
);

export default appointmentsRouter;
