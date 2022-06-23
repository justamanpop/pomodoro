const TotalTime = ({ minutes, seconds }) => {
	return (
		<span className="totalTime">
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
