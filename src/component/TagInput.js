import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {TagsInput} from "react-native-element-textinput";
import COLORS from "../Colors/COLORS";

const TagInput = ({value, setValue}) => {
	return (
		<View style={styles.inputContainer}>
			<TagsInput
				data={value}
				style={styles.input}
				inputStyle={styles.inputStyle}
				tagsStyle={styles.tagsStyle}
				tagsTextStyle={styles.tagsTextStyle}
				placeholder="Tags..."
				placeholderTextColor="gray"
				onChangeValue={(tags) => {
					setValue(tags);
				}}
			/>
		</View>
	);
};

export default TagInput;

const styles = StyleSheet.create({
	inputContainer: {
		padding: 4,
		marginTop: 30,
	},
	input: {
		width: "100%",
		paddingHorizontal: 12,
		borderRadius: 8,
		backgroundColor: COLORS.white,
		borderRadius: 20,
		fontSize: 17,
		paddingHorizontal: 10,
		borderWidth: 2,
		borderColor: COLORS.purple,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
	inputStyle: {
		fontSize: 16,
		minWidth: 80,
	},
	tagsStyle: {
		borderWidth: 0,
		borderRadius: 16,
		padding: 8,
		backgroundColor: COLORS.white,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
	tagsTextStyle: {
		fontSize: 16,
	},
});
