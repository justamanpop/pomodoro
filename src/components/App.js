import { useState } from "react";
import "../styles/App.css";
import NavBar from "./NavBar";
import Timer from "./Timer";
import TimerForm from "./TimerForm";

function App() {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	return (
		<>
			<NavBar />
			<Timer
				timerMinutes={minutes}
				timerSeconds={seconds}
				key={minutes + ":" + seconds}
			/>
			<TimerForm setMinutes={setMinutes} setSeconds={setSeconds} />
		</>
	);
}

export default App;
