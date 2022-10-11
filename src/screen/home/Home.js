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
  getCurrentUser,
  getInvitedGroups,
  getSingleGroupPosts,
  GroupsGet,
} from "../../firebase/FireStore/FirestoreFunc";
import DrawerTab from "../../component/DrawerTab";
import COLORS from "../../Colors/COLORS";

const Home = ({ navigation }) => {
  const { loggedUser, setLoggedUser } = useContext(Context);
  const [show, setShow] = useState(false);
  const movetoRight = useRef(new Animated.Value(1)).current;
  const [allPosts, setAllPosts] = useState([]);
  const [mygroups, setMyGroups] = useState([]);
  const [invitedGroup, setInvitedGroup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupindex, setGroupIndex] = useState(0);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setLoggedUser(user);
        getInvitedGroups(setInvitedGroup);
        setLoading(false);
      })
      .catch((err) => {
        console.log("user not found");
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GroupsGet()
        .then((data) => {
          // console.log(data);
          setMyGroups(data);
          getSingleGroupPosts(setAllPosts, data[groupindex]?.id);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
    return unsubscribe;
  }, [groupindex]);

  const toggleNav = () => {
    Animated.timing(movetoRight, {
      toValue: show ? 0 : 280,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setShow(!show);
  };

  return (
    <SafeAreaView style={homeStyles.container}>
      {loading ? (
        <View style={homeStyles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.lightBlue} />
          <Text style={homeStyles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          <DrawerTab
            toggleNav={toggleNav}
            mygroups={mygroups}
            setGroupIndex={setGroupIndex}
          />
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
                loggedUser={loggedUser}
                groupindex={groupindex}
              />

              <Tab
                allPosts={allPosts}
                mygroups={mygroups}
                invitedGroups={invitedGroup}
                selectedGroupId={mygroups[groupindex]?.id}
              />
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

const TopBar = ({ navigation, onPress, mygroups, loggedUser, groupindex }) => {
  const goToGroup = () => {
    navigation.navigate("MyGroup", {
      id: mygroups ? mygroups[groupindex]?.id : null,
    });
  };
  return (
    <View style={homeStyles.topbarStyle}>
      <TouchableOpacity onPress={onPress}>
        <Feather name="menu" size={25} />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Poppins-Regular",
          fontSize: 17,
        }}
      >
        {mygroups ? mygroups[groupindex]?.value?.groupname : "GROUP NAME"}
      </Text>
      <TouchableOpacity onPress={goToGroup}>
        <Ionicons name="person-outline" size={25} />
        <Text
          style={{
            position: "absolute",
            right: -3,
            top: -5,
            fontFamily: "Poppins-Regular",
          }}
        >
          {mygroups && mygroups[groupindex]?.value?.participents?.length}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
