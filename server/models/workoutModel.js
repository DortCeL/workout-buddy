import { Schema, model } from "mongoose";

// define schema
const workoutSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		reps: {
			type: Number,
			required: true,
		},
		load: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

// create a model
const workoutModel = model("workout", workoutSchema);
export default workoutModel;
