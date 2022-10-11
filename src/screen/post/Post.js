import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AppBar,
  ButtonComp,
  Input,
  LoadingComp,
} from "../../component/Reuse/Reuse";
import { postStyles } from "./PostStyles";
import * as DocumentPicker from "expo-document-picker";
import {
  addPostToFb,
  addPostToGroup,
  getAllGroups,
  getInvitedGroups,
  getMyGroups,
  getSingleGroup,
} from "../../firebase/FireStore/FirestoreFunc";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Context from "../../../context/Context";
import { Timestamp } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../../Colors/COLORS";
import TagInput from "../../component/TagInput";
import Picker from "../../component/Picker";

const Post = () => {
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const { loggedUser } = useContext(Context);
  const navigation = useNavigation();
  const [uploading, setUploading] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const [invitedGroup, setInvitedGroup] = useState([]);
  const [show, setShow] = useState(false);
  const [groupname, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [type, setType] = useState("");

  // console.log("invitedGroup", invitedGroup);
  // console.log("myGroups", myGroups);

  const allAccesable_Group = myGroups.concat(invitedGroup);

  const selectGroup = (name, id) => {
    setGroupName(name);
    setGroupId(id);
    setShow(!show);
  };

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setImage(result.uri);
    setType(result.mimeType);
    console.log(result.mimeType);
  };

  // console.log("user", user);
  // console.log("groupPosts ===>", groupPosts);

  const submit = async () => {
    let fileds = [image, desc, groupname];
    let required = fileds.every(Boolean);
    if (!required) {
      return Alert.alert("Please fill all the field's!");
    }
    if (tags.length == 0) {
      return Alert.alert("provide at least one tags");
    }
    setUploading(true);
    const imgFile = await (await fetch(image)).blob();
    const imagesRef = ref(storage, `images/${imgFile._data.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, imgFile);

    let postData = {
      tags,
      description: desc,
      email: loggedUser.email,
      postedBy: loggedUser.fullname,
      uid: loggedUser.uid,
      postedAt: Timestamp.fromDate(new Date()),
      star: [],
      comments: [],
      groupId,
      groupname,
    };

    return uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setUploading(false);
        return Alert.alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          postData.fileUrl = { url: downloadURL, type };
          addPostToGroup(postData)
            .then((res) => {
              setUploading(false);
              Alert.alert("post added succesfully");
              navigation.navigate("Home");
            })
            .catch((err) => {
              setUploading(false);
              Alert.alert(err.message);
            });
        });
      }
    );
  };

  useEffect(() => {
    getMyGroups(setMyGroups);
    getInvitedGroups(setInvitedGroup);
  }, []);

  // console.log("allGroups ==========================???", allGroups);
  return (
    <SafeAreaView style={postStyles.container}>
      {uploading && <LoadingComp text="Posting..." />}
      <AppBar text="Memory" navigation={navigation} />
      <ScrollView>
        <View style={postStyles.imgWrapper}>
          <TouchableOpacity
            style={postStyles.imgcontainer}
            onPress={_pickDocument}
          >
            <Image
              source={require("../../../assets/images/upload.jpg")}
              style={postStyles.imgStyle}
            />
            {image ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <AntDesign name="file1" size={25} color={COLORS.lightBlue} />
                <Text style={postStyles.uploadText}>Added</Text>
              </View>
            ) : (
              <Text style={postStyles.uploadText}>Upload</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={postStyles.inputContainer}>
          <View style={postStyles.rnStyle}>
            <Picker
              data={allAccesable_Group}
              onPress={selectGroup}
              show={show}
              setShow={setShow}
              groupname={groupname}
            />
          </View>
          <TagInput value={tags} setValue={setTags} />
          <View style={{ marginTop: 20 }}>
            <Input
              multiline={true}
              extraStyle={postStyles.inputExtraStyle}
              placeholder="Description"
              setValue={setDesc}
              numberOfLines={10}
            />
          </View>
          {uploading ? null : (
            <ButtonComp
              text="SUBMIT"
              extraStyle={postStyles.btnExtraStyle}
              onPress={submit}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
