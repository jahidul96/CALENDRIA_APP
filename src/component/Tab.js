import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../Colors/COLORS";
import TimelinePost from "./TimelinePost";
import Group from "./Group";

const tabName = [
  {
    id: 1,
    title: "TIMELINE",
  },
  {
    id: 2,
    title: "GROUPS",
  },
];

const Tab = ({ allPosts, mygroups }) => {
  const [tabTitle, setTabTitle] = useState("TIMELINE");
  const selectTab = (item) => {
    setTabTitle(item.title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabName.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            style={[
              styles.itemStyle,
              item.id == 1 && styles.borderRightStyle,
              item.title == tabTitle && styles.activeStyle,
            ]}
            onPress={() => selectTab(item)}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentWrapper}>
          {tabTitle == "TIMELINE" ? (
            <>
              {allPosts?.length > 0 ? (
                allPosts.map((post) => (
                  <TimelinePost key={post.id} postData={post} />
                ))
              ) : (
                <EmptyTimeline
                  title="Welcome to your Timeline"
                  subText="No Post Till now."
                />
              )}
            </>
          ) : (
            <View style={{ paddingHorizontal: 15 }}>
              {mygroups?.length > 0 ? (
                mygroups.map((group) => (
                  <Group key={group.id} groupData={group} />
                ))
              ) : (
                <EmptyTimeline
                  title="Welcome to your Groups"
                  subText="No Groups Till now."
                />
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Tab;

const EmptyTimeline = ({ title, subText }) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      marginTop: 80,
    }}
  >
    <Text style={{ fontFamily: "Poppins-Regular", fontSize: 20 }}>{title}</Text>
    <Text style={{ fontFamily: "Poppins-Regular", fontSize: 20 }}>
      {subText}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  itemStyle: {
    width: "50%",
    height: 55,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  borderRightStyle: {
    borderRightColor: "#bbb",
    borderRightWidth: 1,
  },
  activeStyle: {
    borderBottomColor: COLORS.yellow,
    borderBottomWidth: 3,
  },
  contentWrapper: {
    paddingVertical: 20,
  },
});
