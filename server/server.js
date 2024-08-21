import express from "express";
import { config } from "dotenv";
import workoutRoutes from "./routes/workoutRoutes.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
config();

// middlware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	console.log(`PATH: ${req.path}    METHOD: ${req.method}`);
	next();
});

// routes
app.use("/api/workouts/", workoutRoutes);

const PORT = process.env.PORT || 8080;

// connect to db and listen
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log(`connected to the DB!`);
		app.listen(PORT, () => {
			console.log(`Server Port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(`${error}`);
	});
