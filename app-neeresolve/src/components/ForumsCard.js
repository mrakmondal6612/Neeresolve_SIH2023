import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Location as LocationIcon, Like1 } from "iconsax-react-native";
import moment from "moment";
import { Image as ExpoImage } from "expo-image";
import { useSelector } from "react-redux";

import { COLORS, FONT, SIZES } from "../constants/theme";
import { makeRequest } from "../helper/apiCalls";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

async function showToast(text) {
  ToastAndroid.show(text, ToastAndroid.SHORT);
}

const ForumsCard = ({ data, refetch, isAdmin = false, navigation }) => {
  const { currentUser } = useSelector((state) => state.user);

  const changeStatusMutation = useMutation(
    (newStatus) => {
      return makeRequest.put(`/report/edit/status/`, newStatus);
    },
    {
      onSuccess: () => {
        showToast("Issue Status changed successfully");
        refetch();
      },
    }
  );

  const changeStatus = (newStatus) => {
    changeStatusMutation.mutate({
      reportId: data?._id,
      status: newStatus,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <Image
          source={require("../../assets/blank-profile.png")}
          style={styles.profileImage}
        />
        <View style={styles.userData}>
          <View style={styles.locationBox}>
            <Text style={styles.locationText}>
              {data?.address ?? "Location"}
            </Text>
            <LocationIcon size={18} color={COLORS.secondary} />
          </View>
          <View style={styles.userDataBox}>
            <Text style={styles.username}>{data?.username ?? "Name"}</Text>
            <Text style={styles.time}>{moment(data?.createdAt).fromNow()}</Text>
          </View>
        </View>
      </View>
      <View style={styles.reportBox}>
        <Text style={styles.reportText}>{data?.issueDesc}</Text>
        <ExpoImage source={{ uri: data?.image }} style={styles.reportImage} />
      </View>
      <View style={styles.buttons}>
        {!isAdmin ? (
          data?.userId !== currentUser?._id ? (
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Solutions", {
                  reportId: data?._id,
                  imgUrl: data?.image,
                  issueDesc: data?.issueDesc,
                  isUser: false,
                });
              }}
            >
              <Text style={styles.buttonText}>Give Solutions</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("Solutions", {
                    reportId: data?._id,
                    imgUrl: data?.image,
                    issueDesc: data?.issueDesc,
                    isUser: true,
                  });
                }}
              >
                <Text style={styles.buttonText}>Check Solutions</Text>
              </TouchableOpacity>
            </>
          )
        ) : data?.status === "In Review" ? (
          <>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.light }]}
              activeOpacity={0.8}
              onPress={() => {
                changeStatus("In Progress");
              }}
            >
              <Text style={[styles.buttonText]}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.error }]}
              activeOpacity={0.8}
              onPress={() => {
                changeStatus("Rejected");
              }}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View
              style={[
                styles.button,
                {
                  backgroundColor:
                    data?.status === "In Progress"
                      ? COLORS.light
                      : COLORS.error,
                },
              ]}
            >
              <Text style={styles.buttonText}>
                {data?.status === "In Progress" ? "In Progress" : "Rejected"}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ForumsCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: SIZES.medium,
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.small,
    borderRadius: SIZES.medium,
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userData: {},
  userDataBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  username: {
    fontFamily: FONT.bold,
    color: COLORS.secondary,
    fontSize: SIZES.medium,
  },
  time: {
    fontFamily: FONT.medium,
    color: COLORS.gray,
    fontSize: SIZES.small,
  },
  locationBox: {
    width: wp(60),
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  locationText: {
    fontFamily: FONT.medium,
    color: COLORS.secondary,
    fontSize: SIZES.medium,
  },
  profileImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
  },
  reportBox: {},
  reportText: {
    paddingHorizontal: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.secondary,
    fontSize: SIZES.medium,
    paddingVertical: SIZES.xSmall,
  },
  reportImage: {
    width: widthPercentageToDP(85),
    height: heightPercentageToDP(40),
    borderRadius: SIZES.small,
  },
  buttons: {
    marginTop: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: FONT.bold,
    color: COLORS.primary,
    fontSize: SIZES.small,
  },
});
