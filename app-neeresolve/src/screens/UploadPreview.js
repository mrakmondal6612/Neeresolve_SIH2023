import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import moment from "moment";
import * as Location from "expo-location";

import BackButton from "../components/Buttons/BackButton";
import { COLORS, FONT, SIZES } from "../constants/theme";
import MainButton from "../components/Buttons/MainButton";
import { firebaseUpload } from "../helper/firebaseUpload";
import { makeRequest } from "../helper/apiCalls";
import DropdownComponent from "../components/DropdownComponent";

async function showToast(text) {
  ToastAndroid.show(text, ToastAndroid.SHORT);
}

const formatDate = (timestamp) => {
  const date = moment(timestamp);

  // Format the date as "DD/MM/YYYY h:mm A"
  const formattedDate = date.format("DD/MM/YYYY h:mm A");

  return formattedDate;
};

const UploadPreview = ({ navigation, route }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [location, setLocation] = useState("");
  const [date, setDate] = useState(formatDate(Date.now()));
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const getAddress = async () => {
    try {
      const latitude = +currentUser?.location?.lat;
      const longitude = +currentUser?.location?.long;

      if (!isNaN(latitude) && !isNaN(longitude)) {
        const addressResponse = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (addressResponse.length > 0) {
          const formattedAddress = `${addressResponse[0].city || ""}, ${
            addressResponse[0].region || ""
          }, ${addressResponse[0].country || ""} ${
            addressResponse[0].postalCode || ""
          }`;

          setLocation(formattedAddress);
        } else {
          console.log("No address found");
        }
      } else {
        console.log("Invalid latitude or longitude values");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const newReportMutation = useMutation(
    (newPost) => {
      return makeRequest.post("/report/", newPost);
    },
    {
      onSuccess: () => {
        showToast("You problem had been reported and is currently in review!");
        queryClient.invalidateQueries(["report-data"]);
        navigation.navigate("Home", {
          screen: "Profile",
        });
        setLoading(false);
      },
      onError: () => {
        showToast("Something went wrong, Please try again!");
        setLoading(false);
      },
    }
  );

  const inputFields = [
    {
      placeholder: "Location (Automatic)",
      value: location,
      onChangeText: (text) => {
        setLocation(text.replace(/\s/g, ""));
      },
      id: 1,
    },
    {
      placeholder: "Date",
      value: date,
      onChangeText: (text) => {
        setDate(text.replace(/\s/g, ""));
      },
      id: 2,
    },
    {
      placeholder: "Describe your issue...",
      value: desc,
      onChangeText: (text) => {
        setDesc(text);
      },
      id: 3,
    },
  ];

  const handleUpload = async () => {
    if (!desc) {
      showToast("Please add a description!");
      return;
    }
    try {
      setLoading(true);
      const parts = route?.params?.imageUrl.split("/");
      const fileName = parts[parts.length - 1];
      const fileUri = route?.params?.imageUrl;
      const userId = currentUser?._id;

      const downloadURL = await firebaseUpload(fileName, userId, fileUri);
      if (downloadURL) {
        const newReport = {
          issueDesc: desc,
          category,
          image: downloadURL,
          userId: currentUser?._id,
          lat: +currentUser?.location?.lat,
          long: +currentUser?.location?.long,
          username: currentUser?.username ?? currentUser?.name,
        };
        newReportMutation.mutate(newReport);
      }
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: StatusBar.currentHeight }}
      behavior="padding"
      enabled
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <BackButton navigation={navigation} />
          <Text style={styles.screenTitle}>Report a Problem</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: route?.params?.imageUrl }}
            style={styles.image}
          />
        </View>
        {inputFields.map((input) => {
          return (
            <View style={styles.inputBox} key={input.id}>
              <TextInput
                style={[
                  styles.textInput,
                  input.id === 3 && {
                    height: hp(15),
                    maxHeight: hp(20),
                    textAlignVertical: "top",
                    paddingVertical: SIZES.medium,
                  },
                ]}
                placeholder={input.placeholder}
                placeholderTextColor={COLORS.gray}
                value={input.value}
                onChangeText={input.onChangeText}
                editable={input.id === 3}
                multiline={input.id === 3}
              />
            </View>
          );
        })}
        <DropdownComponent category={category} setCategory={setCategory} />
        <View
          style={{
            marginHorizontal: SIZES.medium,
          }}
        >
          <MainButton
            bgColor={COLORS.secondary}
            text={"Upload"}
            txtColor={COLORS.primary}
            onPress={handleUpload}
            loading={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UploadPreview;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: hp(10),
    gap: 10,
  },
  header: {
    marginVertical: SIZES.small,
    marginHorizontal: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  screenTitle: {
    fontFamily: FONT.bold,
    color: COLORS.secondary,
    fontSize: wp(5),
  },
  inputBox: {
    marginBottom: SIZES.large,
    marginHorizontal: SIZES.small,
    width: wp(95),
    gap: hp(1),
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    height: hp(7),
    paddingHorizontal: SIZES.small,
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: wp(2),
  },
  image: {
    width: wp(90),
    height: wp(90),
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
});
