import app from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then(() => {
  console.log("Conexion a BD con exito");
  app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
});
