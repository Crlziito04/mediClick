import Router from "express";
import userRoutes from "./userRoutes";
import appointmentsRouter from "./appointmentsRouter";

const indexRouter = Router();

indexRouter.use("/users", userRoutes);
indexRouter.use("/appointments", appointmentsRouter);

export default indexRouter;
