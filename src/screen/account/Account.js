import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useContext} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {AppBar, NormalBtn} from "../../component/Reuse/Reuse";
import {accountStyles} from "./AccountStyle";
import Context from "../../../context/Context";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../../Colors/COLORS";

const img =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsOUOgOXlM3N-FOMuEhE9-8zr6loeh8dsalA&usqp=CAU";

const Account = ({navigation}) => {
	const {user} = useContext(Context);
	return (
		<SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
			<View style={{paddingHorizontal: 20}}>
				<AppBar text="Account" navigation={navigation} />
			</View>
			<ScrollView style={accountStyles.contentWrapper}>
				<View style={accountStyles.profileContainer}>
					<View style={accountStyles.profileImageWrapper}>
						<Image
							source={{uri: img}}
							style={accountStyles.imgStyle}
						/>
						<Text style={accountStyles.name}>Jahidul islam</Text>
						<Text style={accountStyles.email}>
							Jahidul@gmail.com
						</Text>
					</View>
				</View>
				<AccountBtnComp
					text="Upload A Profile Picture"
					icon={
						<Feather
							name="chevron-right"
							size={22}
							color={COLORS.lightBlue}
						/>
					}
				/>
				<AccountBtnComp
					text="Account"
					icon={
						<Feather
							name="chevron-right"
							size={22}
							color={COLORS.lightBlue}
						/>
					}
				/>

				<AccountBtnComp
					text="Groups"
					icon={
						<Feather
							name="chevron-right"
							size={22}
							color={COLORS.lightBlue}
						/>
					}
				/>
				<AccountBtnComp
					text="Password & Security"
					icon={
						<Feather
							name="chevron-right"
							size={22}
							color={COLORS.lightBlue}
						/>
					}
				/>
				<View style={{marginTop: 15}}>
					<NormalBtn text="Delete My Account" />
					<NormalBtn text="Log Out" />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const AccountBtnComp = ({text, icon}) => (
	<TouchableOpacity style={accountStyles.btnContainer}>
		<NormalBtn text={text} />
		{icon}
	</TouchableOpacity>
);

export default Account;
