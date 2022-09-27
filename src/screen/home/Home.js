import {ScrollView, Animated, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SafeAreaView} from "react-native-safe-area-context";
import {homeStyles} from "./HomeStyles";
import {ButtonComp} from "../../component/Reuse/Reuse";
import COLORS from "../../Colors/COLORS";
import Tab from "../../component/Tab";
import Context, {AuthContext} from "../../../context/Context";
import {
	getAllPosts,
	getCurrentUser,
} from "../../firebase/FireStore/FirestoreFunc";
import DrawerTab from "../../component/DrawerTab";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/firebase";
const Home = ({navigation}) => {
	const {setLoggedUser} = useContext(Context);
	const [show, setShow] = useState(false);
	const movetoRight = useRef(new Animated.Value(1)).current;
	const [allPosts, setAllPosts] = useState([]);

	useEffect(() => {
		getCurrentUser()
			.then((user) => {
				setLoggedUser(user);
			})
			.catch((err) => {
				console.log("user not found");
			});

		getAllPosts(setAllPosts);
	}, []);

	const toggleNav = () => {
		Animated.timing(movetoRight, {
			toValue: show ? 0 : 280,
			duration: 300,
			useNativeDriver: true,
		}).start();
		setShow(!show);
	};

	return (
		<SafeAreaView style={homeStyles.container}>
			<DrawerTab toggleNav={toggleNav} />
			<Animated.View
				style={[
					homeStyles.wrapper,
					{transform: [{translateX: movetoRight}]},
				]}
			>
				<SafeAreaView style={{flex: 1}}>
					<TopBar navigation={navigation} onPress={toggleNav} />

					<Tab allPosts={allPosts} />
					<View style={homeStyles.btnWrapper}>
						<ButtonComp
							text="Memories"
							plusText="+"
							extraStyle={homeStyles.btnStyle}
							extraTextStyle={homeStyles.extraTextStyle}
						/>
					</View>
				</SafeAreaView>
			</Animated.View>
		</SafeAreaView>
	);
};

const TopBar = ({navigation, onPress}) => {
	const {setAuthUser} = useContext(AuthContext);
	const logout = () => {
		signOut(auth).then(() => {
			setAuthUser(null);
			navigation.navigate("Register");
		});
	};
	return (
		<View style={homeStyles.topbarStyle}>
			<TouchableOpacity onPress={onPress}>
				<Feather name="menu" size={25} />
			</TouchableOpacity>
			<Text>Profile name</Text>
			<TouchableOpacity onPress={logout}>
				<Ionicons name="person-outline" size={25} />
			</TouchableOpacity>
		</View>
	);
};

export default Home;
