import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../Colors/COLORS";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { FileContentComp } from "../../component/TimelinePostSubComp";

const FileDownload = ({ route }) => {
  const { id, fileUrl } = route.params;
  const navigation = useNavigation();
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const downloadFile = (file) => {
    // Linking.openURL(fileUrl.url);
    // const uri = "http://techslides.com/demos/sample-videos/small.mp4";
    let fileUri = FileSystem.documentDirectory + "aaa.png";

    FileSystem.downloadAsync(file.url, fileUri)
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
          <TouchableOpacity onPress={() => downloadFile(fileUrl)}>
            <AntDesign name="download" size={24} color={COLORS.lightBlue} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.contentContainer}>
          <FileContentComp
            fileUrl={fileUrl}
            setStatus={setStatus}
            video={video}
          />
        </View>
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
    width: "100%",
    height: "50%",
    justifyContent: "center",
  },
  imgStyle: {
    width: "100%",
    height: "50%",
  },
});
