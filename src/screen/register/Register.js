import {Alert, Image, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import {registerStyles} from "./RegisterStyle";
import exportImages, {Red_Logo} from "../../svgImages";
import {
	ButtonComp,
	Input,
	LinkTextComp,
	LoadingComp,
} from "../../component/Reuse/Reuse";
import {fbUserRegister} from "../../firebase/FbAuth/FbAuthFunc";
import {addUserToFB} from "../../firebase/FireStore/FirestoreFunc";
import {useNavigation} from "@react-navigation/native";
import Context, {AuthContext} from "../../../context/Context";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [fullname, setFullname] = useState("");
	const navigation = useNavigation();
	const {setAuthUser} = useContext(AuthContext);
	const {setLoggedUser} = useContext(Context);
	const [uploading, setUploading] = useState(false);

	const register = () => {
		const fileds = [email, password, username, fullname];
		const required = fileds.every(Boolean);
		if (!required) {
			return Alert.alert("please fill all the fields");
		}
		setUploading(true);

		fbUserRegister(email, password)
			.then((user) => {
				let {uid} = user.user;
				let userInfo = {
					email,
					username,
					fullname,
					uid,
					imgUrl: "",
				};
				addUserToFB(userInfo, uid);
				setLoggedUser(userInfo);
				setAuthUser(user);
				setUploading(false);
				navigation.navigate("Home");
			})
			.catch((err) => {
				setUploading(false);
				Alert.alert("something went wrong");
			});
	};
	return (
		<View style={registerStyles.container}>
			{uploading && <LoadingComp text="Posting..." />}
			<View style={registerStyles.logoWrapper}>
				<Red_Logo width={"100%"} height={40} />
			</View>
			<View>
				<Input placeholder="Fullname" setValue={setFullname} />
				<Input placeholder="Username" setValue={setUsername} />

				<Input placeholder="Email" setValue={setEmail} />
				<Input
					placeholder="Password"
					setValue={setPassword}
					secureTextEntry={true}
				/>
				{uploading ? null : (
					<ButtonComp text="Sign up" onPress={register} />
				)}
			</View>
			<LinkTextComp
				text="Have an Account ?"
				linkText="LOGIN"
				pageNavigation={() => navigation.navigate("Login")}
			/>
		</View>
	);
};

export default Register;
