const TotalTime = ({ minutes, seconds, active }) => {
	return (
		<span className={"totalTime" + (active ? " activeTimer" : "")}>
			{minutes.toLocaleString("en-US", {
				minimumIntegerDigits: 2,
				useGrouping: false,
			})}
			:
			{seconds.toLocaleString("en-US", {
				minimumIntegerDigits: 2,
				useGrouping: false,
			})}
		</span>
	);
};

export default TotalTime;
