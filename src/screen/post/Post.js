import {
	Alert,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, {useContext, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {
	AppBar,
	ButtonComp,
	Input,
	LoadingComp,
} from "../../component/Reuse/Reuse";
import {postStyles} from "./PostStyles";
import * as DocumentPicker from "expo-document-picker";
import {addPostToFb} from "../../firebase/FireStore/FirestoreFunc";
import {storage} from "../../firebase/firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import Context from "../../../context/Context";
import {Timestamp} from "firebase/firestore";
import {useNavigation} from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../../Colors/COLORS";
import TagInput from "../../component/TagInput";
import RNPickerSelect from "react-native-picker-select";

const Post = () => {
	const [tags, setTags] = useState([]);
	const [desc, setDesc] = useState("");
	const [image, setImage] = useState(null);
	const {loggedUser} = useContext(Context);
	const navigation = useNavigation();
	const [uploading, setUploading] = useState(false);

	const items = [
		{
			label: "Football",
			value: "football",
		},
		{
			label: "Baseball",
			value: "baseball",
		},
		{
			label: "Hockey",
			value: "hockey",
		},
	];

	const _pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync({});
		alert(result.uri);
		setImage(result.uri);
	};

	// console.log("user", user);

	const placeholder = {
		label: "Group",
		value: null,
		color: "#000",
	};

	const submit = async () => {
		let fileds = [image, desc];
		let required = fileds.every(Boolean);
		if (!required) {
			return Alert.alert("Please fill all the field's!");
		}
		if (tags.length == 0) {
			return Alert.alert("provide at least one tags");
		}
		setUploading(true);
		const imgFile = await (await fetch(image)).blob();
		const imagesRef = ref(storage, `images/${imgFile._data.name}`);
		const uploadTask = uploadBytesResumable(imagesRef, imgFile);

		let postData = {
			tags,
			description: desc,
			email: loggedUser.email,
			postedBy: loggedUser.fullname,
			uid: loggedUser.uid,
			postedAt: Timestamp.fromDate(new Date()),
			star: [],
			comments: [],
		};

		return uploadTask.on(
			"state_changed",
			(snapshot) => {},
			(error) => {
				setUploading(false);
				return Alert.alert(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					postData.fileUrl = downloadURL;
					addPostToFb(postData)
						.then((res) => {
							setUploading(false);
							Alert.alert("post added succesfully");
							navigation.navigate("Home");
						})
						.catch((err) => {
							setUploading(false);
							Alert.alert(err.message);
						});
				});
			}
		);
	};
	return (
		<SafeAreaView style={postStyles.container}>
			{uploading && <LoadingComp text="Posting..." />}
			<AppBar text="Post" navigation={navigation} />
			<ScrollView>
				<View style={postStyles.imgWrapper}>
					<TouchableOpacity
						style={postStyles.imgcontainer}
						onPress={_pickDocument}
					>
						<Image
							source={require("../../../assets/images/upload.jpg")}
							style={postStyles.imgStyle}
						/>
						{image ? (
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									marginTop: 5,
								}}
							>
								<AntDesign
									name="file1"
									size={25}
									color={COLORS.lightBlue}
								/>
								<Text style={postStyles.uploadText}>Added</Text>
							</View>
						) : (
							<Text style={postStyles.uploadText}>Upload</Text>
						)}
					</TouchableOpacity>
				</View>
				<View style={postStyles.inputContainer}>
					<View style={postStyles.rnStyle}>
						<RNPickerSelect
							onValueChange={(value) => console.log(value)}
							items={items}
							placeholder={placeholder}
						/>
					</View>
					<TagInput value={tags} setValue={setTags} />
					<View style={{marginTop: 20}}>
						<Input
							multiline={true}
							extraStyle={postStyles.inputExtraStyle}
							placeholder="Description"
							setValue={setDesc}
							numberOfLines={10}
						/>
					</View>
					{uploading ? null : (
						<ButtonComp
							text="SUBMIT"
							extraStyle={postStyles.btnExtraStyle}
							onPress={submit}
						/>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Post;
