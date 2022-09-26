import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {AccountComp, NormalBtn} from "./Reuse/Reuse";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../Colors/COLORS";
import {useNavigation} from "@react-navigation/native";

const DrawerTab = ({toggleNav}) => {
	const navigation = useNavigation();

	const navigateFunc = (t) => {
		if (t == "Account") {
			navigation.navigate("Account");
			toggleNav();
		} else if (t == "Home") {
			navigation.navigate("Home");
			toggleNav();
		} else if (t == "Post") {
			navigation.navigate("Post");
			toggleNav();
		} else {
			navigation.navigate("CreateGroup");
			toggleNav();
		}
	};
	return (
		<View style={styles.container}>
			<AccountComp
				name="Jahidul islam"
				email="Jahidulislamakashroy96@gmail.com"
				onPress={() => navigateFunc("Account")}
			/>

			<View style={{marginVertical: 10}}>
				<DrawerTabItem
					text="Create Group"
					onPress={() => navigateFunc("CreateGroup")}
				/>
				<DrawerTabItem
					text="Post"
					onPress={() => navigateFunc("Post")}
				/>
			</View>

			<AccountComp
				name="Jahidul islam Famiy"
				email="From you"
				icon={
					<Feather
						name="chevron-right"
						size={22}
						color={COLORS.lightBlue}
					/>
				}
				onPress={() => navigateFunc("Home")}
			/>
		</View>
	);
};

const DrawerTabItem = ({onPress, text}) => (
	<TouchableOpacity style={styles.btnContainer} onPress={onPress}>
		<Text style={styles.text}>{text}</Text>
		<AntDesign name="plus" size={22} color={COLORS.lightBlue} />
	</TouchableOpacity>
);

export default DrawerTab;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingVertical: 15,
		paddingHorizontal: 10,
	},
	btnContainer: {
		width: "75%",
		height: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomColor: COLORS.gray,
		borderBottomWidth: 1,
	},
	text: {
		fontSize: 18,
		marginLeft: 5,
		fontFamily: "Poppins-Regular",
		color: COLORS.lightBlue,
	},
});
