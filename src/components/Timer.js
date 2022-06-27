import React, { useState, useEffect } from "react";
import TimerStates from "../TimerStates";

import swap from "../swap.png";
import notificationSound from "../Notification.wav";

function Timer({
	timerMinutes = 25,
	timerSeconds = 0,
	toggle,
	isFirstRender,
	heading,
}) {
	const [minutes, setMinutes] = useState(timerMinutes);
	const [seconds, setSeconds] = useState(timerSeconds);

	function setTimerEffect() {
		let timer = setInterval(updateTime, 1000);
		return () => {
			clearInterval(timer);
		};
	}

	useEffect(() => {
		setMinutes(timerMinutes);
		setSeconds(timerSeconds);
	}, [timerMinutes, timerSeconds]);

	useEffect(setTimerEffect);

	const [state, setState] = useState(
		isFirstRender ? TimerStates.Paused : TimerStates.Running
	);

	function startOnClick() {
		if (state === TimerStates.Paused) {
			setState(TimerStates.Running);
		} else {
			setState(TimerStates.Paused);
		}
	}

	function resetOnClick() {
		setMinutes(timerMinutes);
		setSeconds(timerSeconds);
		setState(TimerStates.Paused);
	}

	function updateTime() {
		if (state === TimerStates.Paused) return;

		if (seconds !== 0) {
			setSeconds(seconds - 1);
		} else {
			if (minutes !== 0) {
				setMinutes(minutes - 1);
				setSeconds(59);
			} else {
				if (Notification.permission === "default")
					console.log("User hasn't said yea or nay.");
				else if (Notification.permission === "denied")
					console.log("User says nay");
				else if (Notification.permission === "granted") {
					const text = `${heading} timer is up. Starting ${
						heading === "Work" ? "Break" : "Work"
					}`;

					new Notification("Time up!", {
						body: text,
						icon: swap,
					});

					const audio = new Audio(notificationSound);
					audio.play();
				}
				toggle();
			}
		}
	}

	return (
		<div className="main">
			<div className="timerHeader">
				{<span className="timerHeading">{heading}</span>}
				<button
					className="btn btn-primary toggleTimerButton"
					onClick={toggle}
				>
					End {heading} Timer
				</button>
			</div>
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
					{state === TimerStates.Paused ? "Start" : "Pause"}
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
