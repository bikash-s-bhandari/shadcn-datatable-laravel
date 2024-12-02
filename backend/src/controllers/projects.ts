import { Request, Response } from "express";
import * as Yup from "yup";
import { StatusCodes } from "http-status-codes";

import { Project } from "../entity";

const { BAD_REQUEST, CREATED, OK, NOT_FOUND, CONFLICT, INTERNAL_SERVER_ERROR } =
  StatusCodes;

//@desc Get projects list
//@route POST /api/projects
//@access Public
export const list = async (req: Request, res: Response) => {
  try {
    const projects = await Project.createQueryBuilder("project").getMany();

    res.status(OK).json({
      status: "success",
      message: "Projects list",
      data: {
        count: projects.length,
        projects,
      },
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: "error",
      message: error.message,
    });
  }
};
