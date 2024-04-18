import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ArrowLeft2 } from "iconsax-react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


import { COLORS, SIZES } from "../../constants/theme";

const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      activeOpacity={0.8}
      onPress={() => navigation.goBack()}
    >
      <ArrowLeft2 size="32" color={COLORS.secondary} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  btnContainer: {
    borderWidth: 2,
    borderColor: COLORS.white,
    width: wp(10),
    height: wp(10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
});
