import {
	Text,
	TouchableOpacity,
	View,
	Image,
	TextInput,
	ActivityIndicator,
	Alert,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import COLORS from "../../Colors/COLORS";
import {reuseStyles} from "./ReuseStyles";

export const LoadingComp = ({text}) => (
	<View style={reuseStyles.loadingContainer}>
		<ActivityIndicator size="large" color={COLORS.red} />
		<Text style={{fontSize: 17, marginTop: 10, color: COLORS.red}}>
			{text}
		</Text>
	</View>
);

export const ButtonComp = ({text, onPress, extraStyle, extraTextStyle}) => (
	<TouchableOpacity
		style={[reuseStyles.btnContainer, extraStyle]}
		onPress={onPress}
		activeOpacity={0.6}
	>
		<Text style={[reuseStyles.btnText, extraTextStyle]}>{text}</Text>
	</TouchableOpacity>
);

export const Input = ({
	placeholder,
	setValue,
	secureTextEntry,
	multiline,
	extraStyle,
	numberOfLines,
	value,
}) => (
	<TextInput
		style={[reuseStyles.inputStyle, extraStyle]}
		placeholder={placeholder}
		onChangeText={(text) => setValue(text)}
		secureTextEntry={secureTextEntry}
		multiline={multiline}
		numberOfLines={numberOfLines}
		value={value}
	/>
);

export const AppBar = ({text, navigation}) => (
	<View style={reuseStyles.AppBarStyle}>
		<TouchableOpacity onPress={() => navigation.goBack()}>
			<Fontisto name="arrow-left-l" size={24} />
		</TouchableOpacity>
		<Text style={reuseStyles.AppBarText}>{text}</Text>
	</View>
);

export const LinkTextComp = ({text, linkText, pageNavigation, extraStyle}) => (
	<View style={[reuseStyles.linkTextWrapper, extraStyle]}>
		<Text style={reuseStyles.text}>{text}</Text>
		<TouchableOpacity onPress={pageNavigation}>
			<Text style={reuseStyles.linkText}>{linkText}</Text>
		</TouchableOpacity>
	</View>
);

const img =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsOUOgOXlM3N-FOMuEhE9-8zr6loeh8dsalA&usqp=CAU";

// studentVal.presentDate.toDate().toLocaleDateString();

export const NormalBtn = ({text}) => (
	<TouchableOpacity style={reuseStyles.NormalBtn}>
		<Text style={reuseStyles.NormalBtnText}>{text}</Text>
	</TouchableOpacity>
);

export const AccountComp = ({email, name, icon, pic, onPress}) => (
	<TouchableOpacity style={reuseStyles.AccountComp} onPress={onPress}>
		<Image source={{uri: img}} style={reuseStyles.accountImg} />
		<View style={reuseStyles.accountLeftContainer}>
			<View style={reuseStyles.accountTextContainer}>
				<Text style={reuseStyles.accountName}>{name}</Text>
				<Text
					style={[
						reuseStyles.accountEmail,
						icon && {
							marginTop: 2,
							fontSize: 14,
							color: COLORS.lightBlue,
						},
					]}
				>
					{email}
				</Text>
			</View>
			{icon ? (
				icon
			) : (
				<Fontisto
					name="player-settings"
					size={20}
					color={COLORS.gray}
				/>
			)}
		</View>
	</TouchableOpacity>
);
