import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE, Heatmap, Marker } from "react-native-maps";

import { SIZES } from "../constants/theme";
import TopNav from "../components/TopNav";
import { updateUserCall } from "../helper/apiCalls";
import { updateUser } from "../redux/userSlice";

const HomeScreen = ({ navigation }) => {
  const { currentUser, isGuest } = useSelector((state) => state.user);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (location) {
        if (isGuest) {
          const user = {
            _id: currentUser?._id,
            username: currentUser?.username,
            name: currentUser?.name,
            location: {
              lat: location?.coords?.latitude,
              long: location?.coords?.longitude,
            },
          };
          dispatch(updateUser(user));
        } else {
          updateUserLocation(location);
        }
      }
    })();
  }, []);

  const updateUserLocation = async (location) => {
    try {
      const res = await axios.put(updateUserCall, {
        lat: location?.coords?.latitude,
        long: location?.coords?.longitude,
        userId: currentUser?._id,
      });

      if (res.status === 200) {
        dispatch(updateUser(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const WeightedLatLng = {
    latitude: location?.coords?.latitude,
    longitude: location?.coords?.longitude,
    weight: 50,
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <View
          style={{
            marginHorizontal: SIZES.small,
          }}
        >
          <TopNav navigation={navigation} />
        </View>
        {location && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.02,
            }}
          >
            <Heatmap points={[WeightedLatLng]} radius={50} />
            <Marker coordinate={WeightedLatLng} />
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
