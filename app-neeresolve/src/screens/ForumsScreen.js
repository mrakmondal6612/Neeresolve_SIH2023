import {
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Routing, SearchNormal } from "iconsax-react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "react-query";

import BackButton from "../components/Buttons/BackButton";
import { COLORS, FONT, SIZES } from "../constants/theme";
import { makeRequest } from "../helper/apiCalls";
import ForumsCard from "../components/ForumsCard";

const ForumsScreen = ({ navigation }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch } = useQuery(["all-reports"], () =>
    makeRequest
      .get(
        searchQuery?.length > 0
          ? `/report/search?address=${searchQuery}`
          : `/report/?lat=${currentUser?.location?.lat}&long=${currentUser?.location?.long}&threshold=5&category`
      )
      .then((res) => {
        return res.data;
      })
  );

  const renderItems = ({ item }) => {
    return <ForumsCard data={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.screenTitle}>Forums</Text>
      </View>
      <View style={styles.searchBox}>
        <SearchNormal color={COLORS.secondary} size={widthPercentageToDP(6)} />
        <TextInput
          style={styles.textInput}
          placeholder="Search for an address..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            refetch();
          }}
        />
      </View>
      {isLoading && <Text>Loading...</Text>}
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
            <Text style={styles.listTitle}>
              {searchQuery?.length > 0 ? "Search Results" : "Nearby Reports"}
            </Text>
            <Routing size={22} color={COLORS.secondary} />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ForumsScreen;

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
