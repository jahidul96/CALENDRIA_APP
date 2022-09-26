import {StyleSheet} from "react-native";
import COLORS from "../../Colors/COLORS";

export const createGroupStyles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	inputWrapper: {
		flex: 1,
		marginTop: 80,
	},
	inputextraStyle: {
		borderWidth: 0,
		backgroundColor: "transparent",
	},
	btnextraStyle: {
		backgroundColor: COLORS.yellow,
		borderRadius: 5,
		height: 60,
	},
	btnTextStyle: {
		color: COLORS.white,
	},
});
