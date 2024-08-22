import { useState } from "react";
import { backendUrl } from "../../config";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export default function WorkoutForm() {
	const { dispatch } = useWorkoutsContext();

	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");

	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const workout = { title, reps, load };

		const response = await fetch(`${backendUrl}/api/workouts`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(workout),
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
		}

		if (response.ok) {
			// egula local state change korbe
			setError(null);
			setTitle("");
			setLoad("");
			setReps("");

			// eita global state change korbe
			dispatch({ type: "CREATE_WORKOUT", payload: json.workout });

			console.log(`new workout added! ${json}`);
		}
	};

	return (
		<div>
			<form
				className='bg-slate-400 p-8 rounded-lg shadow-lg m-5 w-full max-w-md'
				onSubmit={handleSubmit}
			>
				<label className='block mb-2'>Exercise title :</label>
				<input
					type='text'
					name='title'
					className='w-full p-2 mb-4 rounded border'
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					value={title}
				/>

				<label className='block mb-2'>Load (in KG) :</label>
				<input
					type='text'
					name='load'
					className='w-full p-2 mb-4 rounded border'
					onChange={(e) => {
						setLoad(e.target.value);
					}}
					value={load}
				/>

				<label className='block mb-2'>Reps :</label>
				<input
					type='text'
					name='reps'
					className='w-full p-2 mb-4 rounded border'
					onChange={(e) => {
						setReps(e.target.value);
					}}
					value={reps}
				/>

				<button
					type='submit'
					className='w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded-lg mt-4 transition-all duration-200'
				>
					Add
				</button>

				{error && (
					<div id='error' className='mt-4 text-red-500'>
						{error}
					</div>
				)}
			</form>
		</div>
	);
}
