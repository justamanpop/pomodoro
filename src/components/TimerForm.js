import { Formik, Field, Form } from "formik";

const TimerForm = ({ setMinutes, setSeconds, prefix, autoFocus }) => {
	return (
		<div className="timerForm">
			<Formik
				initialValues={{
					seconds: "",
					minutes: "",
				}}
				validate={(values) => {
					const errors = {};

					if (values.seconds && parseInt(values.seconds) > 59) {
						errors.seconds = "Value must be less than 60";
					}

					let minutesAre0 = parseInt(values.minutes) === 0;
					let secondsAre0 = parseInt(values.seconds) === 0;

					let minutesAreEmpty = !values.minutes;
					let secondsAreEmpty = !values.seconds;

					if (minutesAre0 && secondsAre0) {
						errors.all = "Both seconds and minutes cannot be 0";
					} else if (minutesAreEmpty && secondsAreEmpty) {
						errors.all = "Both seconds and minutes cannot be empty";
					} else if (
						(minutesAre0 || minutesAreEmpty) &&
						(secondsAre0 || secondsAreEmpty)
					) {
						errors.all =
							"Both seconds and minutes cannot be empty or 0";
					}
					return errors;
				}}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(values, { setSubmitting }) => {
					if (!values.minutes) setMinutes(0);
					else setMinutes(parseInt(values.minutes));

					if (!values.seconds) setSeconds(0);
					else setSeconds(parseInt(values.seconds));

					values.seconds = "";
					values.minutes = "";
					setSubmitting(false);
				}}
			>
				{({ values, errors, handleSubmit, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="minutes">{prefix} Minutes</label>
							<Field
								name="minutes"
								id="minutes"
								className="form-control"
								onKeyPress={(event) => {
									if (!/[0-9]/.test(event.key)) {
										event.preventDefault();
									}
								}}
								autoFocus={autoFocus}
							/>
							<span style={{ color: "red", fontSize: "small" }}>
								{errors.minutes}
							</span>
						</div>

						<div className="form-group">
							<label htmlFor="seconds">{prefix} Seconds</label>
							<Field
								name="seconds"
								id="seconds"
								className="form-control"
								onKeyPress={(event) => {
									if (!/[0-9]/.test(event.key)) {
										event.preventDefault();
									}
								}}
							/>
							<span style={{ color: "red", fontSize: "small" }}>
								{errors.seconds}
							</span>
							<span style={{ color: "red", fontSize: "small" }}>
								{errors.all}
							</span>
						</div>

						<button
							type="submit"
							className="btn btn-primary"
							style={{ marginRight: "1em", width: "6em" }}
						>
							Update
						</button>
						<button
							type="reset"
							className="btn btn-secondary"
							style={{ width: "6em" }}
							disabled={isSubmitting}
						>
							Clear
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default TimerForm;
