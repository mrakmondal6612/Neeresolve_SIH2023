import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Location } from "iconsax-react-native";
import { useQuery } from "react-query";
import { FlashList } from "@shopify/flash-list";

import BackButton from "../components/Buttons/BackButton";
import { COLORS, FONT, SIZES } from "../constants/theme";
import { makeRequest } from "../helper/apiCalls";
import ReportCard from "../components/Cards/ReportCard";

const ProfileScreen = ({ navigation }) => {
  async function showToast(text) {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  }
  const { currentUser } = useSelector((state) => state.user);

  const { data, isLoading, isError, refetch } = useQuery(
    ["report-data"],
    () =>
      makeRequest
        .get(`/report/userReports/${currentUser?._id}`)
        .then((res) => res.data),
    {
      onError: (error) =>
        showToast(error?.response?.data?.message ?? "Something went wrong"),
    }
  );

  const renderItems = ({ item }) => {
    return <ReportCard data={item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton navigation={navigation} />
          <Text style={styles.title}>Your Profile</Text>
        </View>
        <FlashList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item) => item._id}
          estimatedItemSize={250}
          refreshControl={
            <RefreshControl
              refreshing={isLoading ? true : false}
              onRefresh={() => {
                refetch();
              }}
            />
          }
          ListHeaderComponent={<Profile currentUser={currentUser} />}
          ListEmptyComponent={
            <Text
              style={{
                alignSelf: "center",
                marginVertical: SIZES.medium,
                fontFamily: FONT.medium,
              }}
            >
              You haven't posted any report.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const Profile = ({ currentUser }) => {
  const location = currentUser?.address ?? "Location";
  return (
    <>
      <View style={styles.profile}>
        <View style={styles.profileImageBox}>
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
        </View>
        <View style={styles.userData}>
          <View style={styles.userLocationBox}>
            <Location size={wp(4)} color={COLORS.secondary} />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <Text style={styles.name}>{currentUser?.name}</Text>
          {currentUser?.username && (
            <Text style={styles.username}>{currentUser?.username}</Text>
          )}
        </View>
      </View>
      <View style={styles.review}>
        <Text style={styles.reviewText}>Your Reports</Text>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: SIZES.medium,
  },
  container: {
    margin: SIZES.small,
    flex: 1,
  },
  title: {
    fontFamily: FONT.bold,
    color: COLORS.secondary,
    fontSize: SIZES.medium + 2,
  },
  profile: {
    marginHorizontal: SIZES.small,
    marginVertical: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
  },
  profileImageBox: {
    width: wp(21),
    height: wp(21),
    borderRadius: wp(10.5),
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: FONT.bold,
    color: COLORS.secondary,
    fontSize: SIZES.medium + 2,
  },
  userLocationBox: {
    width: wp(60),
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  locationText: {
    fontFamily: FONT.medium,
    color: COLORS.secondary,
    fontSize: SIZES.medium,
  },
  review: {
    marginHorizontal: SIZES.medium,
  },
  reviewText: {
    fontFamily: FONT.bold,
    color: COLORS.gray,
  },
});
