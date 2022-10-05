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
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const GroupList = ({ groupData, toggleNav }) => {
  // console.log("groupData", groupData);
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("MyGroup", { id: groupData.id });
    toggleNav();
  };
  return (
    <TouchableOpacity style={[styles.grouplistComp]} onPress={onPress}>
      <Image
        source={{ uri: groupData.value.groupImage }}
        style={styles.groupImg}
      />
      <View style={styles.groupContentWrapper}>
        <View style={styles.groupTextWrapper}>
          <Text style={styles.groupName}>{groupData.value.groupname}</Text>
          <Text style={[styles.groupFrom]}>From you</Text>
        </View>
        <Feather name="chevron-right" size={22} color={COLORS.lightBlue} />
      </View>
    </TouchableOpacity>
  );
};

export default GroupList;

const styles = StyleSheet.create({
  grouplistComp: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  groupImg: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
  groupContentWrapper: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  groupTextWrapper: {
    width: "80%",
  },
  groupName: {
    fontFamily: "Poppins-Regular",
    marginBottom: -2,
    fontSize: 15,
  },
  groupFrom: {
    fontFamily: "Poppins-Light",
    fontSize: 12,
  },
});
