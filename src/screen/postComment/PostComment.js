import {Alert, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useContext, useEffect, useState, useRef} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {AppBar, ButtonComp, Input} from "../../component/Reuse/Reuse";
import {
	commentPost,
	getSinglePost,
} from "../../firebase/FireStore/FirestoreFunc";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../Colors/COLORS";
import {Timestamp} from "firebase/firestore";
import Context from "../../../context/Context";

const PostComment = ({navigation, route}) => {
	const {postData} = route.params;
	const [allComments, setAllComments] = useState(postData.value.comments);
	const [singlPost, setSinglePost] = useState({});
	const [comment, setComment] = useState("");
	const {loggedUser} = useContext(Context);
	const {comments} = singlPost;
	const scrollViewRef = useRef();

	const _commentOnPost = (data) => {
		if (!comment) {
			return Alert.alert("write a comment");
		}
		let val = [
			...allComments,
			{
				postedAt: Timestamp.fromDate(new Date()),
				comment,
				commentedBy: loggedUser,
			},
		];
		setAllComments(val);

		commentPost(val, data.id);
		setComment("");
	};

	useEffect(() => {
		getSinglePost(setSinglePost, postData.id);
	}, []);

	return (
		<SafeAreaView style={{flex: 1}}>
			<View style={{paddingHorizontal: 15}}>
				<AppBar navigation={navigation} text="PostComment" />
			</View>
			<ScrollView
				style={styles.container}
				ref={scrollViewRef}
				onContentSizeChange={() =>
					scrollViewRef.current.scrollToEnd({animated: true})
				}
			>
				{comments?.length == 0 ? (
					<View style={styles.loadingContainer}>
						<Text style={{fontSize: 18}}>No comment till now.</Text>
					</View>
				) : (
					<View style={{paddingVertical: 20}}>
						{comments?.map((comment, i) => (
							<UserComment key={i} data={comment} />
						))}
					</View>
				)}
			</ScrollView>
			<View style={styles.addcommentContainer}>
				<Input
					placeholder="comment"
					extraStyle={styles.InputExtraStyle}
					multiline={true}
					setValue={setComment}
					value={comment}
				/>
				<ButtonComp
					text="Add"
					extraTextStyle={styles.ButtonTextExtraStyle}
					extraStyle={styles.ButtonExtraStyle}
					onPress={() => _commentOnPost(postData)}
				/>
			</View>
		</SafeAreaView>
	);
};

const UserComment = ({data}) => (
	<View style={styles.commentWrapper}>
		<View style={styles.iconWrapper}>
			<Ionicons name="person-outline" size={25} />
		</View>
		<View style={{flex: 1, marginLeft: 15}}>
			<View style={styles.nameContainer}>
				<Text style={styles.name}>{data.commentedBy.fullname}</Text>
				<Text>{data.comment}</Text>
			</View>
			<Text style={styles.time}>
				{data.postedAt.toDate().toLocaleDateString()}
			</Text>
		</View>
	</View>
);

export default PostComment;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
	},
	loadingContainer: {
		marginTop: 100,
		alignItems: "center",
	},
	commentWrapper: {
		flexDirection: "row",
		marginBottom: 15,
	},
	iconWrapper: {
		marginTop: 3,
		borderColor: COLORS.lightBlue,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 100,
	},
	nameContainer: {
		flex: 1,
		backgroundColor: COLORS.gray,
		padding: 10,
		borderRadius: 10,
	},
	name: {
		color: "#000",
		fontFamily: "Poppins-Bold",
	},
	time: {
		marginTop: 5,
		color: COLORS.darkGray,
	},

	addcommentContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		backgroundColor: COLORS.gray,
		paddingHorizontal: 15,
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
