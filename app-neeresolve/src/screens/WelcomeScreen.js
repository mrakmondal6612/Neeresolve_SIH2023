import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";

import { COLORS, FONT, SIZES } from "../constants/theme";
import MainButton from "../components/Buttons/MainButton";
import { loginSuccess } from "../redux/userSlice";

const generateRandomString = (length) => {
  const randomString = Math.random()
    .toString(36)
    .substring(2, 2 + length);
  return randomString;
};

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const guestLogin = () => {
    const user = {
      _id: generateRandomString(12),
      username: `guest-${generateRandomString(6)}`,
      name: "guest",
    };

    dispatch(
      loginSuccess({
        user,
        isGuest: true,
      })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <Image
        source={require("../../assets/vectors/background.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.topPart}>
        <Image
          source={require("../../assets/icon_current.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottomPart}>
        <MainButton
          bgColor={COLORS.secondary}
          text={"Login"}
          txtColor={COLORS.white}
          borderColor={COLORS.secondary}
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        />
        <MainButton
          bgColor={COLORS.primary}
          text={"Register"}
          txtColor={COLORS.secondary}
          borderColor={COLORS.third}
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
        />
        <TouchableOpacity
          style={styles.guestBtn}
          activeOpacity={0.5}
          onPress={guestLogin}
        >
          <Text style={styles.guestBtnText}>Continue as a guest</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    width: wp(93),
    height: hp(40),
    marginVertical: SIZES.small,
    marginHorizontal: SIZES.medium,
    borderRadius: SIZES.small,
  },
  topPart: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: wp(60),
    height: hp(20),
  },
  bottomPart: {
    marginHorizontal: SIZES.small,
    gap: hp(1),
  },
  guestBtn: {
    alignItems: "center",
    marginTop: hp(1),
  },
  guestBtnText: {
    fontFamily: FONT.bold,
    color: COLORS.light,
    fontSize: SIZES.medium + 2,
  },
});
