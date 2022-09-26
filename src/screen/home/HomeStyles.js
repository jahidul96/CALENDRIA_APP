import {StyleSheet} from "react-native";
import COLORS from "../../Colors/COLORS";

export const homeStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	wrapper: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: "#fff",
		borderLeftColor: COLORS.gray,
		borderLeftWidth: 1,
	},

	topbarStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: "8%",
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#bbb",
	},
	btnWrapper: {
		height: "11%",
		paddingHorizontal: 15,
		justifyContent: "center",
		marginBottom: 20,
	},
	btnStyle: {
		borderRadius: 10,
		height: "100%",
		backgroundColor: COLORS.yellow,
	},
});
