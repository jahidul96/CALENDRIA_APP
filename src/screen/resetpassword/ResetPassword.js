import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Calendria_Logo_mark_Yellow} from "../../svgImages";
import {ButtonComp, Input, LinkTextComp} from "../../component/Reuse/Reuse";
import {useNavigation} from "@react-navigation/native";
import {registerStyles} from "../register/RegisterStyle";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../../firebase/firebase";

const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const navigation = useNavigation();

	const resetPass = () => {
		if (!email) {
			Alert.alert("put a verified email");
		}
		sendPasswordResetEmail(auth, email)
			.then(() => {
				Alert.alert("succesfull");
				console.log("email sent to your mail box");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				Alert.alert(error.message);
				// ..
			});
	};

	return (
		<View style={registerStyles.container}>
			<View style={registerStyles.logoWrapper}>
				<Calendria_Logo_mark_Yellow width={120} height={100} />
			</View>
			<View>
				<Input placeholder="Your Email..." setValue={setEmail} />
				<ButtonComp text="Reset Password" onPress={resetPass} />
			</View>
			<LinkTextComp
				text="Don't Have an Account ?"
				linkText="SIGNUP"
				pageNavigation={() => navigation.navigate("Register")}
			/>
		</View>
	);
};

export default ResetPassword;

const styles = StyleSheet.create({});
