import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleWare.js";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../contollers/taskController.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask);

// router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);

router.put("/update/:id", protectRoute, updateTask);
router.delete("/:id", protectRoute, deleteTask);
export default router;
