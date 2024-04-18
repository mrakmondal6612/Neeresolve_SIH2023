import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import BackButton from "../components/Buttons/BackButton";
import { COLORS, FONT, SIZES } from "../constants/theme";
import MainButton from "../components/Buttons/MainButton";

const UploadScreen = ({ navigation }) => {
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Sorry, we need camera roll permissions to select a profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result.assets);

    if (!result.canceled) {
      navigation.navigate("UploadPreview", {
        imageUrl: result.assets[0].uri,
        type: "Image",
      });
    }
  };

  const takeImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Sorry, we need camera roll permissions to select a profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate("UploadPreview", {
        imageUrl: result.assets[0].uri,
        type: "Image",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Text style={styles.screenTitle}>Hi, Report your problem!</Text>
        <Text style={[styles.screenTitle, { fontSize: SIZES.medium }]}>
          Choose an Image to proceed!
        </Text>

        <View style={styles.button}>
          <MainButton
            bgColor={COLORS.secondary}
            text={"Choose from gallery"}
            txtColor={COLORS.white}
            onPress={selectImage}
          />
          <Text style={styles.or}>--- or ---</Text>
          <MainButton
            bgColor={COLORS.primary}
            text={"Take an Image"}
            txtColor={COLORS.secondary}
            borderColor={COLORS.white}
            onPress={takeImage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.small,
  },
  screenTitle: {
    fontFamily: FONT.bold,
    color: COLORS.secondary,
    fontSize: wp(8),
    paddingVertical: wp(2),
  },
  button: {
    gap: hp(1),
  },
  or: {
    fontFamily: FONT.medium,
    color: COLORS.gray,
    alignSelf: "center",
  },
});
