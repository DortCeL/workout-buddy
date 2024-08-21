import workoutModel from "../models/workoutModel.js";
import mongoose from "mongoose";

// get all workouts
export const getAllWorkouts = async (_req, res) => {
	try {
		const allWorkouts = await workoutModel.find({}).sort({ createdAt: -1 });
		res.status(200).json(allWorkouts);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

// get a single workout
export const getWorkout = async (req, res) => {
	const { id } = req.params;

	// check if the given id is Valid as PER MONGODB
	// we need mongoose for this check, so we import it
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "Invalid ID" });
	}

	try {
		const workout = await workoutModel.findById(id);

		if (!workout) {
			return res.status(404).json({ error: "No such workout!" });
			// return kortesi jate it doesnt fire the rest of the code
		}

		res.status(200).json({
			message: "Workout retrieved successfully",
			workout: workout,
		});
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

// create a new workout
export const createWorkout = async (req, res) => {
	const { title, reps, load } = req.body;
	try {
		const newWorkout = await workoutModel.create({
			title,
			reps,
			load,
		});

		res.status(201).json({
			message: "Workout created successfully",
			workout: newWorkout,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
export const deleteWorkout = async (req, res) => {
	const { id } = req.params;

	// Check if the ID is a valid ObjectId
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	try {
		const response = await workoutModel.findByIdAndDelete(id);

		if (!response) {
			return res.status(404).json({ error: "No such workout" });
		}

		res.status(200).json({
			message: "Workout deleted successfully",
			workout: response,
		});
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

// update a workout
export const updateWorkout = async (req, res) => {
	const { id } = req.params;

	// Check if the ID is a valid ObjectId
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	try {
		const response = await workoutModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!response) {
			return res.status(404).json({ error: "No such workout" });
		}

		res.status(200).json({
			message: "Workout updated successfully",
			workout: response,
		});
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};
