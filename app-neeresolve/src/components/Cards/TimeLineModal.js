import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import moment from "moment";
import { CloseCircle } from "iconsax-react-native";

const TimeLineModal = ({ openModal, data, setOpenModal }) => {
  return (
    <Modal visible={openModal} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Your Problem Timeline</Text>
          <TouchableOpacity onPress={() => setOpenModal(false)}>
            <CloseCircle color={COLORS.white} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.timeLineBox}>
          <Text style={styles.text}>{moment(data?.createdAt).calendar()}</Text>
          <View style={styles.dot}></View>
          <Text style={styles.text}>Problem Uploaded by user</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.timeLineBox}>
          <Text style={styles.text}>{moment(data?.updatedAt).calendar()}</Text>
          <View style={styles.dot}></View>
          <Text style={styles.text}>Approved by the administration</Text>
        </View>
      </View>
    </Modal>
  );
};

export default TimeLineModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    width: widthPercentageToDP(90),
    position: "absolute",
    bottom: heightPercentageToDP(30),
    left: widthPercentageToDP(5),
    borderRadius: SIZES.small,
    minHeight: heightPercentageToDP(20),
    padding: SIZES.small,
  },
  text: {
    fontFamily: FONT.medium,
    color: COLORS.primary,
    fontSize: SIZES.medium,
    maxWidth: widthPercentageToDP(45),
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.small,
  },
  timeLineBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    width: 2,
    height: heightPercentageToDP(10),
    backgroundColor: COLORS.primary,
    marginVertical: SIZES.small,
    alignSelf: "center",
  },
  title: {
    fontFamily: FONT.bold,
    color: COLORS.primary,
    fontSize: SIZES.large,
    alignSelf: "center",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.small,
  },
});
