import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { COLORS, FONT, SIZES } from "../constants/theme";

const TopNav = ({ navigation }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Neeresolve</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        {currentUser?.isAdmin ? (
          <Text
            style={{
              fontFamily: FONT.bold,
              color: COLORS.light,
              fontSize: SIZES.large + 2,
            }}
          >
            Admin
          </Text>
        ) : (
          <Image
            style={styles.profileImage}
            source={
              currentUser.profilePicture
                ? {
                    uri: currentUser?.profilePicture,
                  }
                : require("../../assets/blank-profile.png")
            }
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    marginTop: SIZES.small,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    position: "absolute",
    width: wp(90),
    top: 0,
    zIndex: 99,
    paddingHorizontal: SIZES.medium,
  },
  profileImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
  },
  title: {
    fontFamily: FONT.bold,
    color: COLORS.white,
    fontSize: SIZES.large,
  },
});
