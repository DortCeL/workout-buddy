import { createContext, useReducer } from "react";
import { workoutsReducer } from "./WorkoutsReducer.jsx";

export const WorkoutsContext = createContext();

const initialValue = { workouts: null };

export const WorkoutsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(workoutsReducer, initialValue);

	return (
		<WorkoutsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</WorkoutsContext.Provider>
	);
};
