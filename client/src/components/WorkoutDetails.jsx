import PropTypes from "prop-types";

const WorkoutDetails = ({ workout }) => {
	return (
		<div className='px-8 py-3 rounded bg-slate-300 w-56 grid'>
			<h4 className='text-xl '>{workout.title}</h4>
			<hr />
			<p>
				<strong>Load (KG): </strong>
				{workout.load}
			</p>
			<p>
				<strong>Reps: </strong>
				{workout.reps}
			</p>
			<p>{new Date(workout.createdAt).toLocaleDateString()}</p>
		</div>
	);
};

export default WorkoutDetails;
