import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, {useState} from "react";
import COLORS from "../Colors/COLORS";
import TimelinePost from "./TimelinePost";
import Group from "./Group";

const tabName = [
	{
		id: 1,
		title: "Timeline",
	},
	{
		id: 2,
		title: "Groups",
	},
];

const Tab = ({allPosts}) => {
	const [tabTitle, setTabTitle] = useState("Timeline");
	const selectTab = (item) => {
		setTabTitle(item.title);
	};

	return (
		<View style={styles.container}>
			<View style={styles.tabContainer}>
				{tabName.map((item) => (
					<TouchableOpacity
						key={item.id}
						activeOpacity={0.7}
						style={[
							styles.itemStyle,
							item.id == 1 && styles.borderRightStyle,
							item.title == tabTitle && styles.activeStyle,
						]}
						onPress={() => selectTab(item)}
					>
						<Text style={styles.itemText}>{item.title}</Text>
					</TouchableOpacity>
				))}
			</View>
			<View style={{flex: 1}}>
				<ScrollView contentContainerStyle={styles.contentWrapper}>
					{tabTitle == "Timeline" ? (
						<>
							{allPosts?.length > 0 ? (
								allPosts.map((post) => (
									<TimelinePost
										key={post.id}
										postData={post}
									/>
								))
							) : (
								<EmptyTimeline title="Welcome to your Timeline" />
							)}
						</>
					) : (
						<>
							<Group />
							<Group />
						</>
					)}
				</ScrollView>
			</View>
		</View>
	);
};

export default Tab;

const EmptyTimeline = ({title}) => (
	<View
		style={{
			justifyContent: "center",
			alignItems: "center",
			marginTop: 80,
		}}
	>
		<Text style={{fontFamily: "Poppins-Regular", fontSize: 20}}>
			{title}
		</Text>
		<Text style={{fontFamily: "Poppins-Regular", fontSize: 20}}>
			No Post Till now.
		</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabContainer: {
		flexDirection: "row",
	},
	itemStyle: {
		width: "50%",
		height: 60,
		backgroundColor: COLORS.lightGray,
		justifyContent: "center",
		alignItems: "center",
	},
	itemText: {
		fontFamily: "Poppins-Regular",
	},
	borderRightStyle: {
		borderRightColor: "#bbb",
		borderRightWidth: 1,
	},
	activeStyle: {
		borderBottomColor: COLORS.yellow,
		borderBottomWidth: 3,
	},
	contentWrapper: {
		paddingHorizontal: 15,
		paddingVertical: 20,
	},
});
