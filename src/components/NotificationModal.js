import { useEffect } from "react";

const NotificationModal = () => {
	const notificationPermissionModal = () => {
		if (!("Notification" in window)) {
			console.log("This browser does not support desktop notification");
			return;
		} else {
			console.log("Notifications are supported");
			if (Notification.permission !== "granted")
				window.$("#notificationModal").modal({ focus: true });
		}
	};

	useEffect(notificationPermissionModal, []);

	const requestPermission = () => {
		window.$("#notificationModal").modal("hide");
		Notification.requestPermission();
	};

	return (
		<div
			className="modal"
			id="notificationModal"
			tabIndex="-1"
			role="dialog"
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Notification Permission</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<p>Pomodoro wants to notify you when timers are up</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-primary"
							onClick={requestPermission}
						>
							Allow
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationModal;
