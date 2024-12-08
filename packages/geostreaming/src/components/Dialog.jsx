import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Dialog as MuiDialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	IconButton,
	FormControlLabel,
	Checkbox,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	dialogCloseButton: {
		position: "absolute",
		top: theme.spacing(1),
		right: theme.spacing(1),
	},
	checkboxContainer: {
		marginTop: theme.spacing(2),
		display: "flex",
		alignItems: "center",
	},
	dialogPaper: {
		width: "70vw",
		maxWidth: "1200px",
		height: "auto",
		maxHeight: "800px",
	}
}));

const Dialog = ({
	open,
	onClose,
	title,
	children,
	cookieId = "default-dialog",
}) => {
	const classes = useStyles();
	const [dontShowAgain, setDontShowAgain] = React.useState(false);

	React.useEffect(() => {
		// Check if "don't show again" cookie exists
		const shouldHide = document.cookie.split("; ").find((row) => row.startsWith(`${cookieId}=`));

		if (shouldHide) {
			onClose();
		}
	}, [cookieId, onClose]);

	const handleClose = () => {
		if (dontShowAgain) {
			// Set cookie to expire in 365 days
			const expiryDate = new Date();
			expiryDate.setDate(expiryDate.getDate() + 365);
			document.cookie = `${cookieId}=true; expires=${expiryDate.toUTCString()}; path=/`;
		}
		onClose();
	};

	return (
		<MuiDialog
			open={open}
			onClose={handleClose}
			classes={classes.dialogPaper}
		>
			<DialogTitle>
				{title}
				<IconButton className={classes.dialogCloseButton} onClick={handleClose}>
					<Clear />
				</IconButton>
			</DialogTitle>

			<DialogContent >
				<DialogContentText>
					{children}
					<div className={classes.checkboxContainer}>
						<FormControlLabel
							control={
								<Checkbox
									checked={dontShowAgain}
									onChange={(e) => setDontShowAgain(e.target.checked)}
									color="primary"
								/>
							}
							label="Don't show this message again"
						/>
					</div>
				</DialogContentText>
			</DialogContent>
		</MuiDialog>
	);
};

export default Dialog;
