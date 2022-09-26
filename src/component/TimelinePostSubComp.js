import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import COLORS from "../Colors/COLORS";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from "@react-navigation/native";

export const SinglePost = ({postData, value, loggedUser, _LikeOnPost}) => {
	const isLiked = value.star.filter((s) => s.likedBy == loggedUser?.email);

	return (
		<View style={styles.TimelinePostContainer}>
			<Image source={{uri: value.fileUrl}} style={styles.imgStyle} />
			<Tag tags={value} />
			<View style={styles.nameContainer}>
				<Text style={[styles.tabitemText, {color: COLORS.darkGray}]}>
					PostedBy :
				</Text>
				<Text style={styles.name}>{value.postedBy}</Text>
			</View>
			<Text style={styles.tabitemText}>{value.description}</Text>
			<View style={styles.iconContainer}>
				<View style={{flexDirection: "row"}}>
					<CommentComp value={value} postData={postData} />
					<LikedComp
						isLiked={isLiked}
						onPress={_LikeOnPost}
						value={value}
						postData={postData}
					/>
				</View>
				<Text
					style={[
						styles.tabitemText,
						{color: COLORS.darkGray, fontSize: 12},
					]}
				>
					{value.postedAt.toDate().toLocaleDateString()}
				</Text>
			</View>
		</View>
	);
};

const Tag = ({tags}) => (
	<View style={styles.tagContainer}>
		{tags.tags.map((tag, i) => (
			<View key={i} style={styles.tagItem}>
				<Text style={[styles.tabitemText, styles.tagText]}>{tag}</Text>
			</View>
		))}
	</View>
);

const CommentComp = ({value, postData}) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("PostComment", {postData})}
		>
			<Entypo name="message" size={24} color={COLORS.lightBlue} />

			<View style={styles.commentCounter}>
				<Text style={styles.commentCounterText}>
					{value.comments.length}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const LikedComp = ({isLiked, onPress, value, postData}) => (
	<>
		{isLiked.length == 0 ? (
			<TouchableOpacity
				style={styles.likedCounter}
				onPress={() => onPress(postData, isLiked)}
			>
				<Text style={styles.likeText}>{value.star.length}</Text>
				<Entypo
					name="star"
					size={20}
					color={COLORS.darkGray}
					style={{marginLeft: 3, marginTop: -5}}
				/>
			</TouchableOpacity>
		) : (
			<TouchableOpacity
				style={styles.likedCounter}
				onPress={() => onPress(postData, isLiked)}
			>
				<Text style={styles.likeText}>{value.star.length}</Text>
				<Entypo
					name="star"
					size={20}
					color={COLORS.red}
					style={{marginLeft: 3, marginTop: -5}}
				/>
			</TouchableOpacity>
		)}
	</>
);

const styles = StyleSheet.create({
	TimelinePostContainer: {
		width: "100%",
		paddingVertical: 10,
		paddingBottom: 15,
		borderBottomColor: COLORS.gray,
		borderBottomWidth: 1,
		marginBottom: 10,
	},
	nameContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	name: {
		fontFamily: "Poppins-Regular",
		fontSize: 18,
		marginLeft: 10,
		letterSpacing: 1,
		marginTop: -8,
	},
	imgStyle: {
		width: "100%",
		height: 150,
		borderWidth: 1,
		borderColor: COLORS.lightBlue,
		marginBottom: 10,
		borderRadius: 5,
	},
	iconContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
	},
	commentCounter: {
		position: "absolute",
		top: -3,
		right: -3,
		width: 15,
		height: 15,
		borderRadius: 100,
		backgroundColor: COLORS.red,
		justifyContent: "center",
		alignItems: "center",
	},
	commentCounterText: {
		color: COLORS.white,
		fontSize: 9,
		fontFamily: "Poppins-Bold",
	},
	likedCounter: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 15,
		marginTop: -5,
	},
	likeText: {
		fontFamily: "Poppins-Bold",
		fontSize: 17,
	},
	tabitemText: {
		marginBottom: 8,
		fontFamily: "Poppins-Regular",
	},

	tagContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	tagItem: {
		backgroundColor: COLORS.lightGray,
		marginRight: 8,
		paddingHorizontal: 8,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	tagText: {color: COLORS.darkGray, marginTop: 4, fontSize: 12},
	addcommentContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	InputExtraStyle: {
		width: "65%",
		borderWidth: 1,
		borderColor: COLORS.gray,
		height: 40,
		borderRadius: 10,
		fontSize: 13,
	},
	ButtonExtraStyle: {
		width: "30%",
		height: 40,
		backgroundColor: COLORS.lightBlue,
		marginTop: -10,
		borderRadius: 10,
	},
	ButtonTextExtraStyle: {
		color: COLORS.white,
		fontSize: 13,
	},
});
