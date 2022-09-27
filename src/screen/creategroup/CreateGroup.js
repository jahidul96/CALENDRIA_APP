import {Text, View} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {AppBar, ButtonComp, Input} from "../../component/Reuse/Reuse";
import {createGroupStyles} from "./CreateGroupStyles";

const CreateGroup = ({navigation}) => {
	const [group, setGroup] = useState("");
	return (
		<SafeAreaView style={createGroupStyles.container}>
			<AppBar text="CREATE GROUP" navigation={navigation} />

			<View style={createGroupStyles.inputWrapper}>
				<Input
					placeholder="Enter group name"
					extraStyle={createGroupStyles.inputextraStyle}
					setValue={setGroup}
				/>
			</View>

			<View style={{marginBottom: 20}}>
				{group.length > 2 ? (
					<ButtonComp
						text="Add Group"
						extraStyle={createGroupStyles.btnextraStyle}
					/>
				) : null}
			</View>
		</SafeAreaView>
	);
};

export default CreateGroup;
