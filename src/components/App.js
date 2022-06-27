import { useState } from "react";
import "../styles/App.css";
import NotificationModal from "./NotificationModal";
import NavBar from "./NavBar";
import Timer from "./Timer";
import TimerForm from "./TimerForm";
import TotalTime from "./TotalTime";

function App() {
	const [workMinutes, setWorkMinutes] = useState(25);
	const [workSeconds, setWorkSeconds] = useState(0);

	const [breakMinutes, setBreakMinutes] = useState(5);
	const [breakSeconds, setBreakSeconds] = useState(0);

	//boolean to check wether we are in work timer or break timer
	const [isWork, setIsWork] = useState(true);

	//boolean to check if it's the very first render, and will not autostart timer if true
	const [isFirstRender, setIsFirstRender] = useState(true);

	const toggle = () => {
		setIsFirstRender(false);
		setIsWork(!isWork);
	};

	return (
		<>
			<NotificationModal />
			<NavBar />
			{isWork ? (
				<Timer
					timerMinutes={workMinutes}
					timerSeconds={workSeconds}
					key={"Work " + workMinutes + ":" + workSeconds}
					toggle={toggle}
					isFirstRender={isFirstRender}
					heading="Work"
				/>
			) : (
				<Timer
					timerMinutes={breakMinutes}
					timerSeconds={breakSeconds}
					key={"Break " + breakMinutes + ":" + breakSeconds}
					toggle={toggle}
					isFirstRender={isFirstRender}
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
						setIsFirstRender={setIsFirstRender}
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
						setIsFirstRender={setIsFirstRender}
					/>
				</div>
			</div>
		</>
	);
}

export default App;
