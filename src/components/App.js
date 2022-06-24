import { useState } from "react";
import "../styles/App.css";
import NavBar from "./NavBar";
import Timer from "./Timer";
import TimerForm from "./TimerForm";
import TotalTime from "./TotalTime";

function App() {
	const [workMinutes, setWorkMinutes] = useState(25);
	const [workSeconds, setWorkSeconds] = useState(0);

	const [breakMinutes, setBreakMinutes] = useState(5);
	const [breakSeconds, setBreakSeconds] = useState(0);

	const [isWork, setIsWork] = useState(true);

	const toggle = () => {
		setIsWork(!isWork);
	};

	return (
		<>
			<NavBar />
			{isWork ? (
				<Timer
					timerMinutes={workMinutes}
					timerSeconds={workSeconds}
					key={workMinutes + ":" + workSeconds}
					toggle={toggle}
					heading="Work"
				/>
			) : (
				<Timer
					timerMinutes={breakMinutes}
					timerSeconds={breakSeconds}
					key={breakMinutes + ":" + breakSeconds}
					toggle={toggle}
					heading="Break"
				/>
			)}

			<div className="timerFormRow">
				<div className="timerFormContainer1">
					<TotalTime
						minutes={workMinutes}
						seconds={workSeconds}
						active={isWork}
					/>
					<TimerForm
						setMinutes={setWorkMinutes}
						setSeconds={setWorkSeconds}
						prefix="Work Timer"
						autoFocus={true}
					/>
				</div>
				<div className="timerFormContainer2">
					<TotalTime
						minutes={breakMinutes}
						seconds={breakSeconds}
						active={!isWork}
					/>
					<TimerForm
						setMinutes={setBreakMinutes}
						setSeconds={setBreakSeconds}
						prefix="Break Timer"
						autoFocus={false}
					/>
				</div>
			</div>
		</>
	);
}

export default App;
