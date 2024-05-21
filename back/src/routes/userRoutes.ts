import Router from "express";
import userController from "../controllers/userControllers";
import { validate } from "../services/utils/validates/validate";
import { validateLogin } from "../services/utils/validates/validateUsername";

const userRoutes = Router();

userRoutes.get("/", userController.getUsers);
userRoutes.get("/:id", validate.validateId, userController.getUserById);
userRoutes.post(
  "/register",
  validate.validateDataUser,
  userController.postRegister
);
userRoutes.post(
  "/login",
  validateLogin.validateDataUser,
  userController.postLogin
);

export default userRoutes;
