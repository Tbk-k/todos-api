import express from "express";
import { getTask, addTask } from "../controllers/tasksControllers.js";

const router = express.Router();

router.post("/get", getTask);
router.post("/add", addTask);

export default router;
