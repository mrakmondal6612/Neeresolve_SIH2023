import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DirectDown, DirectUp, Location } from "iconsax-react-native";
import moment from "moment";

import { COLORS, FONT, SIZES } from "../../constants/theme";
import { makeRequest } from "../../helper/apiCalls";
import { useSelector } from "react-redux";

const SuggestionCard = ({ data }) => {
  const { currentUser } = useSelector((state) => state.user);

  const { data: userData, isLoading } = useQuery(["user", data.userId], () =>
    makeRequest.get(`/user/details/${data.userId}`).then((res) => res.data)
  );

  const queryClient = useQueryClient();

  const voteMutation = useMutation(
    (vote) => {
      return makeRequest.patch(`/report/suggestion/vote/${data._id}`, vote);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["solution", data?.reportId]);
      },
    }
  );

  const handleVote = (vote) => {
    voteMutation.mutate({
      userId: userData._id,
      type: vote,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userData}>
        <View style={styles.locationBox}>
          <Text style={styles.locationText}>
            {userData?.address ?? "Location"}
          </Text>
          <Location size={18} color={COLORS.secondary} />
        </View>
        <View style={styles.userDataBox}>
          <Text style={styles.username}>{userData?.username ?? "Name"}</Text>
          <Text style={styles.time}>{moment(data?.createdAt).fromNow()}</Text>
        </View>
      </View>
      <View style={styles.suggestionBox}>
        <Text style={styles.title}>Suggested:</Text>
        <Text style={styles.suggestionText}>{data?.suggestion}</Text>
      </View>
      <View style={styles.likeBox}>
        <TouchableOpacity
          style={styles.like}
          activeOpacity={0.4}
          onPress={() => handleVote("upvote")}
          disabled={isLoading || data?.upvotes?.includes(currentUser._id)}
        >
          <DirectUp
            color={
              data?.upvotes?.includes(currentUser._id)
                ? COLORS.light
                : COLORS.secondary
            }
            variant={
              data?.upvotes?.includes(currentUser._id) ? "Bold" : "Outline"
            }
            size={25}
          />
          <Text style={styles.likeText}>{data?.upvotes?.length ?? 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.like}
          activeOpacity={0.4}
          onPress={() => handleVote("downvote")}
          disabled={isLoading || data?.downvotes?.includes(currentUser._id)}
        >
          <DirectDown
            color={
              data?.downvotes?.includes(currentUser._id)
                ? COLORS.light
                : COLORS.secondary
            }
            variant={
              data?.downvotes?.includes(currentUser._id) ? "Bold" : "Outline"
            }
            size={25}
          />
          <Text style={styles.likeText}>{data?.downvotes?.length ?? 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuggestionCard;

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.small,
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
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
  title: {
    fontFamily: FONT.medium,
    color: COLORS.secondary,
    fontSize: SIZES.small + 2,
  },
  suggestionText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  likeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  likeText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  like: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
