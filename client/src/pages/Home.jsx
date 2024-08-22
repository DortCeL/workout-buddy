import { useEffect } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

// context
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";

// constants
import { backendUrl } from "../../config";
const url = `${backendUrl}/api/workouts`; // Correct URL with protocol

export default function Home() {
	// destructuring so third bracket... balsal
	const { workouts, dispatch } = useWorkoutsContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const response = await fetch(url);
				const json = await response.json();

				if (response.ok) {
					dispatch({ type: "SET_WORKOUTS", payload: json });
				} else {
					console.error("Failed to fetch workouts");
				}
			} catch (error) {
				console.error("Fetch error: ", error);
			}
		};

		fetchWorkouts();
	}, []); // Keep an empty array to ensure it only runs once

	return (
		<>
			<div className='container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					{workouts &&
						workouts.map((workout) => (
							<WorkoutDetails key={workout._id} workout={workout} />
						))}
				</div>

				<WorkoutForm />
			</div>
		</>
	);
}
