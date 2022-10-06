import {
  ScrollView,
  Animated,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeStyles } from "./HomeStyles";
import { ButtonComp } from "../../component/Reuse/Reuse";
import Tab from "../../component/Tab";
import Context from "../../../context/Context";
import {
  getAllPosts,
  getCurrentUser,
  getMyGroups,
} from "../../firebase/FireStore/FirestoreFunc";
import DrawerTab from "../../component/DrawerTab";
import COLORS from "../../Colors/COLORS";

const Home = ({ navigation }) => {
  const { setLoggedUser } = useContext(Context);
  const [show, setShow] = useState(false);
  const movetoRight = useRef(new Animated.Value(1)).current;
  const [allPosts, setAllPosts] = useState([]);
  const [mygroups, setMyGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setLoggedUser(user);
        getMyGroups(setMyGroups);
        getAllPosts(setAllPosts);
        setLoading(false);
      })
      .catch((err) => {
        console.log("user not found");
      });
  }, []);

  const toggleNav = () => {
    Animated.timing(movetoRight, {
      toValue: show ? 0 : 280,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setShow(!show);
  };

  // console.log("mygroups first data", mygroups[0]);
  // console.log("mygroupsfull data", mygroups);

  return (
    <SafeAreaView style={homeStyles.container}>
      {loading ? (
        <View style={homeStyles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.lightBlue} />
          <Text style={homeStyles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          <DrawerTab toggleNav={toggleNav} mygroups={mygroups} />
          <Animated.View
            style={[
              homeStyles.wrapper,
              { transform: [{ translateX: movetoRight }] },
            ]}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <TopBar
                navigation={navigation}
                onPress={toggleNav}
                mygroups={mygroups}
              />

              <Tab allPosts={allPosts} mygroups={mygroups} />
              <View style={homeStyles.btnWrapper}>
                <ButtonComp
                  text="Memories"
                  plusText="+"
                  extraStyle={homeStyles.btnStyle}
                  extraTextStyle={homeStyles.extraTextStyle}
                  onPress={() => navigation.navigate("Post")}
                />
              </View>
            </SafeAreaView>
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

const TopBar = ({ navigation, onPress, mygroups }) => {
  const goToGroup = () => {
    navigation.navigate("MyGroup", {
      id: mygroups[0]?.id ? mygroups[0]?.id : null,
    });
  };
  return (
    <View style={homeStyles.topbarStyle}>
      <TouchableOpacity onPress={onPress}>
        <Feather name="menu" size={25} />
      </TouchableOpacity>
      <Text>Profile name</Text>
      <TouchableOpacity onPress={goToGroup}>
        <Ionicons name="person-outline" size={25} />
        {mygroups[0]?.value?.participents?.length > 0 ? (
          <Text style={homeStyles.groupCounter}>
            {mygroups[0]?.value?.participents?.length}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default Home;
