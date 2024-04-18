import {
  Keyboard,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { COLORS, FONT, SIZES } from "../constants/theme";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";

import { makeRequest } from "../helper/apiCalls";
import BackButton from "../components/Buttons/BackButton";
import SuggestionCard from "../components/Cards/SuggestionCard";

const SolutionScreen = ({ route, navigation }) => {
  const { currentUser } = useSelector((state) => state.user);

  const { reportId, imgUrl, issueDesc, isUser } = route.params;

  const { data, isLoading, refetch } = useQuery(["solution", reportId], () =>
    makeRequest.get(`/report/suggestion/${reportId}`).then((res) => {
      return res.data;
    })
  );

  const [reportText, setReportText] = useState("");
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const keyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const keyboardDidHide = () => {
    setKeyboardOpen(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const newSuggestionMutation = useMutation(
    (newSuggestion) => {
      return makeRequest.post("/report/suggestion", newSuggestion);
    },
    {
      onSuccess: () => {
        refetch();
        setReportText("");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const suggest = () => {
    newSuggestionMutation.mutate({
      reportId,
      suggestion: reportText,
      userId: currentUser._id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <SuggestionCard data={item} navigation={navigation} />
        )}
        estimatedItemSize={100}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={COLORS.secondary}
          />
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <BackButton navigation={navigation} />
              <Text style={styles.screenTitle}>Suggestions</Text>
            </View>
            <View style={styles.issue}>
              <Image source={{ uri: imgUrl }} style={styles.issueImg} />
              <Text style={styles.issueText}>{issueDesc}</Text>
            </View>
            <View style={styles.solutionBox}>
              <Text style={styles.title}>Suggested Solutions</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No solutions yet</Text>
          </View>
        }
      />
      {!isUser && (
        <View
          style={[
            styles.inputBox,
            { bottom: isKeyboardOpen ? heightPercentageToDP(28) : 10 },
          ]}
        >
          <TextInput
            style={styles.input}
            onChangeText={setReportText}
            value={reportText}
            placeholder="Add your solution"
          />
          <TouchableOpacity
            style={styles.button}
            disabled={!reportText}
            onPress={suggest}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SolutionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  issue: {
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.small,
  },
  issueText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    marginLeft: SIZES.small,
    marginTop: SIZES.small,
  },
  issueImg: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(40),
    borderRadius: SIZES.small,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: SIZES.medium,
    marginTop: SIZES.small,
  },
  screenTitle: {
    fontFamily: FONT.bold,
    color: COLORS.secondary,
    fontSize: SIZES.medium + 2,
    marginRight: SIZES.small,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    marginLeft: SIZES.medium,
  },
  inputBox: {
    marginHorizontal: SIZES.medium,
    marginTop: SIZES.medium,
    width: widthPercentageToDP(93),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    marginVertical: SIZES.small,
    backgroundColor: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
  button: {
    backgroundColor: COLORS.secondary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginTop: SIZES.small,
  },
  buttonText: {
    fontFamily: FONT.bold,
    color: COLORS.white,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
});
