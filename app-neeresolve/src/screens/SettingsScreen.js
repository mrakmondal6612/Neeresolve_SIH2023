import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

import { COLORS, SIZES } from "../constants/theme";
import MainButton from "../components/Buttons/MainButton";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={styles.buttons}>
        <MainButton
          bgColor={COLORS.secondary}
          text={"Logout"}
          txtColor={COLORS.primary}
          onPress={logoutUser}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  buttons: {
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.small,
  },
});
