import {
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { Routing, SearchNormal } from "iconsax-react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "react-query";

import { COLORS, FONT, SIZES } from "../constants/theme";
import ForumsCard from "../components/ForumsCard";
import { makeRequest } from "../helper/apiCalls";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AdminReportScreen = () => {
  const Stack = createNativeStackNavigator();
  const { currentUser } = useSelector((state) => state.user);
  const { data, isLoading, isError, refetch } = useQuery(["all-reports"], () =>
    makeRequest
      .get(
        `/report/?lat=${currentUser?.location?.lat}&long=${currentUser?.location?.long}&threshold=1&category`
      )
      .then((res) => {
        return res.data;
      })
  );

  const renderItems = ({ item }) => {
    return <ForumsCard data={item} refetch={refetch} isAdmin />;
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <Stack.Screen />
      <View style={styles.searchBox}>
        <SearchNormal color={COLORS.secondary} size={widthPercentageToDP(6)} />
        <TextInput
          style={styles.textInput}
          placeholder="Search for areas, problems, categories, users..."
        />
      </View>
      <FlashList
        data={data}
        renderItem={renderItems}
        keyExtractor={(item) => item._id.toString()}
        estimatedItemSize={200}
        refreshControl={
          <RefreshControl
            refreshing={isLoading ? true : false}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        ListEmptyComponent={
          <Text
            style={{
              alignSelf: "center",
              marginVertical: SIZES.medium,
              fontFamily: FONT.medium,
            }}
          >
            No Reports near you.
          </Text>
        }
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Problems Near you</Text>
            <Routing size={22} color={COLORS.secondary} />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default AdminReportScreen;

const styles = StyleSheet.create({
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
  searchBox: {
    margin: SIZES.small,
    marginHorizontal: SIZES.medium,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.small,
    gap: 10,
    borderRadius: SIZES.small,
  },
  textInput: {
    width: "90%",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginLeft: SIZES.large,
  },
  listTitle: {
    fontFamily: FONT.bold,
    color: COLORS.secondary,
    fontSize: SIZES.small + 2,
  },
});
