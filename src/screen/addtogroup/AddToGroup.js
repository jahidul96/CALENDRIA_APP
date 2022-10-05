import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AppBar, ButtonComp } from "../../component/Reuse/Reuse";
import COLORS from "../../Colors/COLORS";
import { useNavigation } from "@react-navigation/native";
import TagInput from "../../component/TagInput";
import { addUserToGroup } from "../../firebase/FireStore/FirestoreFunc";

const AddToGroup = ({ route }) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const { id, group } = route.params;
  const [alreadyExits, setAlreadyExists] = useState(group?.participents);

  //   alreadyExits

  const addUser = () => {
    if (users.length == 0) {
      return Alert.alert("at least one email required!");
    }
    const data = alreadyExits.concat(users);
    setAlreadyExists(data);
    addUserToGroup(data, id)
      .then(() => {
        Alert.alert("User Added");
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("something went wrong");
      });
  };
  return (
    <View style={styles.container}>
      <AppBar navigation={navigation} />
      <ScrollView>
        <TagInput
          placeholder={"Enter Email..."}
          value={users}
          setValue={setUsers}
          extraInputStyle={styles.extraInputStyle}
        />
      </ScrollView>
      <View>
        <ButtonComp text="ADD" onPress={addUser} />
      </View>
    </View>
  );
};

export default AddToGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  extraInputStyle: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});
