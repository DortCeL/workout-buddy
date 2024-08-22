import { backendUrl } from "../../config";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";

const WorkoutDetails = ({ workout }) => {
	const { dispatch } = useWorkoutsContext();

	const handleDelete = async () => {
		const response = await fetch(`${backendUrl}/api/workouts/${workout._id}`, {
			method: "DELETE",
		});

		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_WORKOUT", payload: json.workout });
		}
	};

	return (
		<div className='bg-slate-300 p-6 rounded-lg shadow-md flex justify-between items-center mb-4 w-full'>
			<div>
				<h4 className='text-2xl font-semibold mb-2 text-red-700'>
					{workout.title}
				</h4>
				<hr className='mb-2' />
				<p>
					<strong>Load (KG): </strong>
					{workout.load}
				</p>
				<p>
					<strong>Reps: </strong>
					{workout.reps}
				</p>
				<p className='text-gray-500'>
					{formatDistanceToNow(new Date(workout.createdAt), {
						addSuffix: true,
					})}
				</p>
			</div>
			<div>
				<button
					className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200'
					onClick={handleDelete}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default WorkoutDetails;
