import {StyleSheet} from "react-native";
import COLORS from "../../Colors/COLORS";

export const accountStyles = StyleSheet.create({
	contentWrapper: {
		paddingHorizontal: 20,
	},
	profileImageWrapper: {
		width: "100%",
		alignItems: "center",
		paddingBottom: 25,
		borderBottomColor: COLORS.lightGray,
		borderBottomWidth: 1,
	},
	profileContainer: {
		paddingTop: 30,
	},
	name: {
		fontSize: 21,
		fontFamily: "Poppins-Regular",
		letterSpacing: 1,
	},
	email: {
		marginTop: 3,
		fontSize: 17,
		letterSpacing: 1,
		color: COLORS.darkGray,
	},
	text: {
		fontFamily: "Poppins-Regular",
		fontSize: 17,
		marginBottom: 7,
	},
	imgStyle: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
		marginTop: 10,
	},
	btnContainer: {
		height: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 8,
		borderBottomColor: COLORS.lightGray,
		borderBottomWidth: 1,
	},
});
