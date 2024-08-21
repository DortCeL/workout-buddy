import { useState } from "react";
import { backendUrl } from "../../config";

export default function WorkoutForm() {
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
			setError(null);
			setTitle("");
			setLoad("");
			setReps("");

			console.log(`new workout added! ${json}`);
		}
	};

	return (
		<div>
			<form
				className='bg-slate-400 flex flex-col p-12 rounded m-5 w-60'
				onSubmit={handleSubmit}
			>
				<label>Exercise title : </label>
				<input
					type='text'
					name='title'
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					value={title}
				/>

				<label>Load (in KG) : </label>
				<input
					type='text'
					name='load'
					onChange={(e) => {
						setLoad(e.target.value);
					}}
					value={load}
				/>

				<label>Reps : </label>
				<input
					type='text'
					name='reps'
					onChange={(e) => {
						setReps(e.target.value);
					}}
					value={reps}
				/>

				<button
					type='submit'
					className='bg-green-700 hover:bg-green-600 text-white px-2 py-2 rounded-xl mt-4'
				>
					Add
				</button>

				{error && <div id='error'>{error}</div>}
			</form>
		</div>
	);
}
