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
	// const [workouts, setWorkouts] = useState(null);
	const [workouts, dispatch] = useWorkoutsContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const response = await fetch(url);
				const json = await response.json();

				if (response.ok) {
					// setWorkouts(json);
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
			<div className='flex flex-row'>
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
