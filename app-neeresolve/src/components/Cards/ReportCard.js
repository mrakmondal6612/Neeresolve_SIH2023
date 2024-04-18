import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChartCircle, Location } from "iconsax-react-native";
import { Image as ExpoImage } from "expo-image";

import { COLORS, FONT, SIZES } from "../../constants/theme";
import moment from "moment";
import TimeLineModal from "./TimeLineModal";

const ReportCard = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <View style={styles.userLocationBox}>
          <Location size={wp(4)} color={COLORS.secondary} />
          <Text style={styles.locationText}>{data?.address}</Text>
        </View>
        <Text style={styles.time}>
          You posted this report {moment(data?.createdAt).fromNow()}
        </Text>
      </View>
      <Text style={styles.reportText}>{data?.issueDesc}</Text>
      <ExpoImage
        source={{
          uri: data?.image,
        }}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.statusBox}
        activeOpacity={0.7}
        onPress={() => setOpenModal(true)}
      >
        <ChartCircle size={wp(5)} color={COLORS.primary} />
        <Text style={styles.statusText}>{data?.status}</Text>
      </TouchableOpacity>
      {openModal && <TimeLineModal data={data} setOpenModal={setOpenModal} />}
    </View>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
  },
  topPart: {},
  userLocationBox: {
    width: wp(70),
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  locationText: {
    fontFamily: FONT.medium,
    color: COLORS.secondary,
    fontSize: SIZES.medium,
  },
  reportText: {
    fontFamily: FONT.bold,
    color: COLORS.secondary,
    fontSize: SIZES.medium + 2,
  },
  time: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  image: {
    width: "100%",
    height: hp(40),
    borderRadius: SIZES.small,
  },
  statusBox: {
    backgroundColor: COLORS.fourth,
    marginTop: SIZES.small,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.xSmall,
    borderRadius: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  },
  statusText: {
    fontFamily: FONT.medium,
    color: COLORS.primary,
    textTransform: "capitalize",
  },
});
