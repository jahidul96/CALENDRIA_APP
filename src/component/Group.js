import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Tag} from "./TimelinePostSubComp";

const img =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsOUOgOXlM3N-FOMuEhE9-8zr6loeh8dsalA&usqp=CAU";

const tags = ["#local", "#funny"];

const Group = () => {
	return (
		<TouchableOpacity style={styles.groupContainer}>
			<Image source={{uri: img}} style={styles.GroupimgStyle} />
			<View style={styles.groupRightContainer}>
				<Text style={styles.tabitemText}>LocalGroup</Text>
				<Text style={styles.tabitemText}>TestUser</Text>
				<Tag tags={tags} />
			</View>
		</TouchableOpacity>
	);
};

export default Group;

const styles = StyleSheet.create({
	tabitemText: {
		marginBottom: 8,
		fontFamily: "Poppins-Regular",
	},
	groupContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 25,
	},
	GroupimgStyle: {
		width: "35%",
		height: 100,
	},
	groupRightContainer: {
		marginLeft: 20,
	},
});
