import {
  ActivityIndicator,
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

import { COLORS, FONT, SIZES } from "../../constants/theme";

const MainButton = ({
  bgColor,
  text,
  txtColor,
  onPress,
  borderColor,
  loading,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgColor, borderColor: borderColor },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.primary} />
      ) : (
        <Text style={[styles.btnTxt, { color: txtColor }]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    borderRadius: SIZES.small,
    borderWidth: 2,
  },
  btnTxt: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium + 2,
    textAlign: "center",
  },
});
