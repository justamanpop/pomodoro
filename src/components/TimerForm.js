import { Formik, Field, Form } from "formik";

const TimerForm = ({ setMinutes, setSeconds }) => {
	return (
		<div className="timerForm">
			<Formik
				initialValues={{ seconds: "", minutes: "" }}
				validate={(values) => {
					const errors = {};

					if (values.seconds && values.seconds > 59) {
						errors.seconds = "Value must be less than 60";
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

					setSubmitting(false);
				}}
			>
				{({ values, errors, handleSubmit, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="minutes">Minutes</label>
							<Field
								name="minutes"
								id="minutes"
								className="form-control"
								onKeyPress={(event) => {
									if (!/[0-9]/.test(event.key)) {
										event.preventDefault();
									}
								}}
								autoFocus
							/>
							<span style={{ color: "red", fontSize: "small" }}>
								{errors.minutes}
							</span>
						</div>

						<div className="form-group">
							<label htmlFor="seconds">Seconds</label>
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
						</div>
						<button
							type="submit"
							className="btn btn-primary"
							style={{ marginRight: "1em", width: "6em" }}
						>
							Set Timer
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
