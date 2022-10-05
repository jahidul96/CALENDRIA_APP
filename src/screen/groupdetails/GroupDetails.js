import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../Colors/COLORS";
import {
  getSingleGroup,
  likePost,
} from "../../firebase/FireStore/FirestoreFunc";
import Context from "../../../context/Context";
import { SinglePost, Tag } from "../../component/TimelinePostSubComp";

const GroupDetails = ({ route }) => {
  const navigation = useNavigation();
  const [groupPosts, setGroupPosts] = useState([]);
  const { groupData } = route.params;
  const id = groupData.id;
  const { value } = groupData;
  const { loggedUser } = useContext(Context);
  const posts = true;

  useEffect(() => {
    getSingleGroup(id, setGroupPosts, posts);
  }, []);

  const _LikeOnPost = (data, isLiked, value) => {
    let collectionname = "Groups";

    const something = groupPosts.filter((gpost) => gpost == value);

    console.log("something", something);

    // const res = [...something];

    // console.log("res", res);

    // console.log("groupPosts", groupPosts);

    // console.log("isLiked", isLiked);

    // console.log("value single post =================?/////", value);
    // if (isLiked.length == 0) {
    //   let val = [
    //     ...value.star,
    //     {
    //       likedBy: loggedUser.email,
    //     },
    //   ];
    //   likePost(val, data.id, collectionname);
    // } else {
    //   let val = value.star.filter((st) => st.likedBy != loggedUser.email);
    //   likePost(val, data.id, collectionname);
    // }
  };

  //   console.log("id ========>", id);
  //   console.log("value ========>", value);
  //   console.log("this groupPosts ========>", groupPosts);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbarContainer}>
        <View style={styles.topbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Fontisto name="arrow-left-l" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Post")}>
            <AntDesign name="pluscircleo" size={24} color={COLORS.lightBlue} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.groupNameContainer}>
          <Text style={styles.groupDate}>
            {value.createdAt.toDate().toLocaleDateString()}
          </Text>
          <Text style={styles.groupName}>{value.groupname}</Text>
        </View>

        <View>
          {groupPosts.length == 0 ? (
            <View>
              <Text>No post in this group</Text>
            </View>
          ) : (
            groupPosts.map((post, i) => (
              <SinglePost
                key={i}
                value={post}
                loggedUser={loggedUser}
                postData={groupData}
                _LikeOnPost={_LikeOnPost}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topbarContainer: {
    height: 60,
    width: "100%",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  topbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  groupNameContainer: {
    paddingHorizontal: 25,
    height: 100,
    justifyContent: "center",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  groupDate: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
  },
  groupName: {
    fontFamily: "Poppins-Regular",
    fontSize: 22,
    marginTop: 3,
    letterSpacing: 1,
  },
});
