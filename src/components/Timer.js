import React, { useState, useReducer, useEffect } from "react";
import TimerStates from "../TimerStates";
import TotalTime from "./TotalTime";

function Timer({ timerMinutes = 25, timerSeconds = 0 }) {
	const [minutes, setMinutes] = useState(timerMinutes);
	const [seconds, setSeconds] = useState(timerSeconds);
	const [startButtonText, setStartButtonText] = useState("Start");

	function myEffect() {
		let timer = setInterval(updateTime, 1000);
		return () => {
			clearInterval(timer);
		};
	}

	useEffect(myEffect);

	function stateReducer(state, action) {
		if (action === TimerStates.Initial) {
			setMinutes(timerMinutes);
			setSeconds(timerSeconds);
			setStartButtonText("Start");
		} else if (action === TimerStates.Paused) {
			setStartButtonText("Start");
		} else if (action === TimerStates.Running) {
			setStartButtonText("Pause");
		}

		return action;
	}

	const [state, dispatch] = useReducer(stateReducer, TimerStates.Initial);

	function startOnClick() {
		if (state === TimerStates.Initial || state === TimerStates.Paused) {
			dispatch(TimerStates.Running);
		} else {
			dispatch(TimerStates.Paused);
		}
	}

	function resetOnClick() {
		dispatch(TimerStates.Initial);
	}

	function updateTime() {
		if (
			state === TimerStates.Initial ||
			state === TimerStates.Paused ||
			state === TimerStates.Finished
		)
			return;

		if (seconds !== 0) {
			setSeconds(seconds - 1);
		} else {
			if (minutes !== 0) {
				setMinutes(minutes - 1);
				setSeconds(59);
			} else {
				dispatch(TimerStates.Finished);
			}
		}
	}

	return (
		<div className="main">
			<TotalTime minutes={timerMinutes} seconds={timerSeconds} />
			<div className="timerContainer">
				{minutes.toLocaleString("en-US", {
					minimumIntegerDigits: 2,
					useGrouping: false,
				})}
				:
				{seconds.toLocaleString("en-US", {
					minimumIntegerDigits: 2,
					useGrouping: false,
				})}
			</div>
			<div className="timerButtonsContainer">
				<button
					className="btn btn-lg startButton"
					onClick={startOnClick}
					disabled={
						(timerMinutes === 0 && timerSeconds === 0) ||
						(minutes === 0 && seconds === 0)
					}
				>
					{startButtonText}
				</button>
				<button
					className="btn btn-lg resetButton"
					onClick={resetOnClick}
					disabled={timerMinutes === 0 && timerSeconds === 0}
				>
					Reset
				</button>
			</div>
		</div>
	);
}

export default Timer;
