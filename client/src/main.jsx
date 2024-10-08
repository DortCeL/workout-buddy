import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkoutsContextProvider } from "./context/WorkoutsContext.jsx";

createRoot(document.getElementById("root")).render(
	<WorkoutsContextProvider>
		<App />
	</WorkoutsContextProvider>
);
