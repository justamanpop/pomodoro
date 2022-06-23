import timer from "../timer.svg";

function NavBar() {
	return (
		<div className="navBar">
			<div className="navBarText">
				Pomodoro Timer
				<img src={timer} alt="Timer icon" className="timerIcon"></img>
			</div>
		</div>
	);
}

export default NavBar;
