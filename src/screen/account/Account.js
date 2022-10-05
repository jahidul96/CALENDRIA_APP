import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ButtonComp, NormalBtn } from "../../component/Reuse/Reuse";
import { accountStyles } from "./AccountStyle";
import Context, { AuthContext } from "../../../context/Context";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../../Colors/COLORS";
import { doc, deleteDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, storage } from "../../firebase/firebase";
import {
  addProfilePic,
  deleteFromFb,
  getCurrentUser,
} from "../../firebase/FireStore/FirestoreFunc";
import * as DocumentPicker from "expo-document-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const img = "http://cdn.onlinewebfonts.com/svg/img_550782.png";

const Account = ({ navigation }) => {
  const { loggedUser, setLoggedUser } = useContext(Context);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  //   console.log("loggedUser", loggedUser);

  const { setAuthUser } = useContext(AuthContext);

  const logout = () => {
    signOut(auth).then(() => {
      setAuthUser(null);
      navigation.navigate("Register");
    });
  };

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setImage(result.uri);
    setShow(true);
  };

  const uploadProfilePic = async () => {
    const imgFile = await (await fetch(image)).blob();
    const imagesRef = ref(storage, `profilePic/${imgFile._data.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, imgFile);
    return uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        return Alert.alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addProfilePic(downloadURL)
            .then(() => {
              Alert.alert("profile pic added succesfully");
              setShow(false);
              getCurrentUser().then((user) => {
                setLoggedUser(user);
              });
            })
            .catch((err) => {
              Alert.alert("something went wrong");
            });
        });
      }
    );
  };

  const deleteAccount = () => {
    const collectionname = "Users";
    deleteFromFb(auth.currentUser.uid, collectionname)
      .then((res) => {
        setAuthUser(null);
        navigation.navigate("Register");
      })
      .catch((err) => {
        Alert.alert("something went wrong!");
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <AppBar text="Account" navigation={navigation} />
      </View>
      <ScrollView style={accountStyles.contentWrapper}>
        <View style={accountStyles.profileContainer}>
          <View style={accountStyles.profileImageWrapper}>
            <Image
              source={{ uri: loggedUser.imgUrl ? loggedUser.imgUrl : img }}
              style={accountStyles.imgStyle}
            />
            <Text style={accountStyles.name}>{loggedUser.username}</Text>
            <Text style={accountStyles.email}>{loggedUser.email}</Text>
          </View>
        </View>
        {show && image ? (
          <ImageModel
            image={image}
            uploadProfilePic={uploadProfilePic}
            onPress={_pickDocument}
          />
        ) : null}
        <AccountBtnComp
          text="Upload A Profile Picture"
          icon={
            <Feather name="chevron-right" size={22} color={COLORS.lightBlue} />
          }
          onPress={_pickDocument}
        />
        <AccountBtnComp
          text="Account"
          icon={
            <Feather name="chevron-right" size={22} color={COLORS.lightBlue} />
          }
        />

        <AccountBtnComp
          text="Groups"
          icon={
            <Feather name="chevron-right" size={22} color={COLORS.lightBlue} />
          }
        />
        <AccountBtnComp
          text="Password & Security"
          icon={
            <Feather name="chevron-right" size={22} color={COLORS.lightBlue} />
          }
        />
        <View style={{ marginTop: 15 }}>
          <NormalBtn text="Delete My Account" onPress={deleteAccount} />
          <NormalBtn text="Log Out" onPress={logout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AccountBtnComp = ({ text, icon, onPress }) => (
  <TouchableOpacity style={accountStyles.btnContainer}>
    <NormalBtn text={text} onPress={onPress} />
    {icon}
  </TouchableOpacity>
);

const ImageModel = ({ image, uploadProfilePic, onPress }) => (
  <View style={accountStyles.imageModel}>
    {image ? (
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: image }} style={accountStyles.selectedImgStyle} />
      </TouchableOpacity>
    ) : null}
    <ButtonComp
      text="Upload"
      extraStyle={{ width: "50%", borderRadius: 5, height: 35 }}
      extraTextStyle={{ fontSize: 14 }}
      onPress={uploadProfilePic}
    />
  </View>
);

export default Account;
