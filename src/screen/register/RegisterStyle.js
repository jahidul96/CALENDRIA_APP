import {StyleSheet} from "react-native";
import COLORS from "../../Colors/COLORS";

export const registerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.lightBlue,
		paddingHorizontal: 15,
		paddingVertical: 50,
		justifyContent: "center",
	},

	logoWrapper: {
		marginBottom: 50,
		alignItems: "center",
	},
});
