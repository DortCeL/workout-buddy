import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";

export const useWorkoutContext = () => {
	const whateverContext = useContext(WorkoutsContext);

	if (!whateverContext) {
		// it means wrong root e use kora hoise
		throw Error(
			`useWorkoutContext must be used inside an WorkoutsContextProvider`
		);
	}

	return whateverContext;
};
