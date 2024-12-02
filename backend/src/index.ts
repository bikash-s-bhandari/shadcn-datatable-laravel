import express from "express";
import "dotenv/config";

import connectDB from "./bootstrap/database";
import initialMiddlewares from "./middlewares";

import baseRouter from "./routes";

const port = process.env.PORT || 8000;

const getApp = async () => {
  const app = express();

  await initialMiddlewares(app);
  await connectDB();
  app.use("/api", baseRouter());

  return app;
};

async function startApp() {
  const app = await getApp();

  app.listen(port, () => {
    console.log(
      `API SERVER RUNNING ON PORT: ${port} and worker id at ${process.pid}`
    );
  });
}

startApp();
