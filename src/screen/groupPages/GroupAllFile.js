import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Colors/COLORS";
import { AppBar } from "../../component/Reuse/Reuse";
import { useNavigation } from "@react-navigation/native";
import { getSingleGroupPosts } from "../../firebase/FireStore/FirestoreFunc";

const GroupAllFile = ({ route }) => {
  const { value, id } = route.params;
  const navigation = useNavigation();
  const [groupPosts, setGroupPosts] = useState([]);

  // console.log("id", id);
  // console.log("groupPosts", groupPosts[0].value);

  useEffect(() => {
    getSingleGroupPosts(setGroupPosts, id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbarContainer}>
        <AppBar navigation={navigation} text={value.groupname} />
      </View>
      <ScrollView style={styles.contentWrapper}>
        {groupPosts?.length == 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>NO ALBUM TILL NOW</Text>
          </View>
        ) : (
          <View style={styles.filesMainWrapper}>
            {groupPosts.map((post) => (
              <FileComp key={post.id} value={post.value.fileUrl} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupAllFile;

const FileComp = ({ value }) => (
  <View style={styles.imgWrapper}>
    <Image source={{ uri: value.url }} style={styles.fileStyle} />
  </View>
);

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
    paddingHorizontal: 15,
  },
  contentWrapper: {
    paddingVertical: 20,
  },
  filesMainWrapper: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imgWrapper: {
    width: "31%",
    height: 120,
    marginRight: 5,
    marginBottom: 10,
  },
  fileStyle: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
});
