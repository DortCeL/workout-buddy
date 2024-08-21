import express from "express";
import {
	createWorkout,
	deleteWorkout,
	getAllWorkouts,
	getWorkout,
	updateWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", getAllWorkouts);
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

export default router;
