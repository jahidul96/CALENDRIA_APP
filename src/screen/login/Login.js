import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import {Calendria_Logo_mark_Yellow} from "../../svgImages";
import {
	ButtonComp,
	Input,
	LinkTextComp,
	LoadingComp,
} from "../../component/Reuse/Reuse";
import {useNavigation} from "@react-navigation/native";
import {registerStyles} from "../register/RegisterStyle";
import {signinWithFb} from "../../firebase/FbAuth/FbAuthFunc";
import COLORS from "../../Colors/COLORS";
import {getCurrentUser} from "../../firebase/FireStore/FirestoreFunc";
import {AuthContext} from "../../../context/Context";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();
	const {setAuthUser} = useContext(AuthContext);
	const [uploading, setUploading] = useState(false);

	const login = async () => {
		const fileds = [email, password];
		const required = fileds.every(Boolean);
		if (!required) {
			return Alert.alert("please fill all the fields");
		}
		setUploading(true);
		signinWithFb(email, password)
			.then(async (data) => {
				await getCurrentUser().then((user) => {
					setAuthUser(user);
					setUploading(false);
					navigation.navigate("Home");
				});
			})
			.catch(() => {
				setUploading(false);
			});
	};

	const extraStyle = {backgroundColor: COLORS.yellow};
	const extraTextStyle = {
		color: COLORS.white,
	};

	return (
		<View style={registerStyles.container}>
			{uploading && <LoadingComp text="Loggingin..." />}
			<View style={registerStyles.logoWrapper}>
				<Calendria_Logo_mark_Yellow width={120} height={100} />
			</View>
			<View>
				<Input placeholder="Email" setValue={setEmail} />
				<Input
					placeholder="Password"
					setValue={setPassword}
					secureTextEntry={true}
				/>
				{uploading ? null : (
					<ButtonComp
						text="Sign up"
						onPress={login}
						extraStyle={extraStyle}
						extraTextStyle={extraTextStyle}
					/>
				)}
			</View>
			<LinkTextComp
				text="Don't Have an Account ?"
				linkText="SIGNUP"
				pageNavigation={() => navigation.navigate("Register")}
			/>
			<LinkTextComp
				text="Forgot password ?"
				linkText="Reset"
				pageNavigation={() => navigation.navigate("ResetPassword")}
				extraStyle={{marginTop: 10}}
			/>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({});
