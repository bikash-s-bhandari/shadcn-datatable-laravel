import express from "express";

import { list } from "../controllers/projects";

const router = express.Router();

// public routes
router.route("/list").post(list);

export default router;
