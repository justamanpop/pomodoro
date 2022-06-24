import React, { useState, useReducer, useEffect } from "react";
import TimerStates from "../TimerStates";

function Timer({ timerMinutes = 25, timerSeconds = 0, toggle, heading }) {
	const [minutes, setMinutes] = useState(timerMinutes);
	const [seconds, setSeconds] = useState(timerSeconds);
	const [startButtonText, setStartButtonText] = useState("Start");

	function setTimerEffect() {
		let timer = setInterval(updateTime, 1000);
		return () => {
			clearInterval(timer);
		};
	}

	function toggleTimerState() {
		if (state === TimerStates.Finished) {
			toggle();
		}
	}

	// useEffect(() => {
	// console.log("initializing minutes, seconds and button text useEffect called")
	// 	setMinutes(timerMinutes);
	// 	setSeconds(timerSeconds);
	// 	setStartButtonText("Start");
	// }, [timerMinutes, timerSeconds]);

	useEffect(setTimerEffect);
	useEffect(toggleTimerState);

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
			{<span className="timerHeading">{heading}</span>}
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
