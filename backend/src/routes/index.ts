import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import projects from "./projects";

const baseRouter = () => {
  const router = Router();

  router.use("/projects", projects);

  router.use("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "error",
      message: "Not Found",
    });
  });

  return router;
};

export default baseRouter;
