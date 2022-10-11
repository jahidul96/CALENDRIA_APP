import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../Colors/COLORS";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
const FileDownload = ({ route }) => {
  const { id, fileUrl } = route.params;
  const navigation = useNavigation();

  //   console.log(id);
  //   console.log(fileUrl);

  const downloadFile = async () => {
    const uri =
      "http://firebasestorage.googleapis.com/v0/b/expodemopractice.appspot.com/o/images%2F04f29766-389b-4533-9080-02f45839d7a7.jpeg?alt=media&token=6d47f6ac-30d4-4dcc-a65b-52ab5c7f510b";
    let fileUri = FileSystem.documentDirectory + "image.jpeg";
    console.log("path", fileUri);
    console.log("fileurl", fileUrl);
    FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        console.log(uri);
        saveFile(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveFile = async (fileUri) => {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbarContainer}>
        <View style={styles.topbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Fontisto name="arrow-left-l" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={downloadFile}>
            <AntDesign name="download" size={24} color={COLORS.lightBlue} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Image source={{ uri: fileUrl.url }} style={styles.imgStyle} />
      </View>
    </SafeAreaView>
  );
};

export default FileDownload;

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
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  imgStyle: {
    width: "100%",
    height: "50%",
  },
});
