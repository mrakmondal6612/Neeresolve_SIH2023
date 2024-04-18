import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Home2, AddSquare, Setting, Message } from "iconsax-react-native";

import { COLORS, SIZES } from "../constants/theme";
import HomeStackNavigation from "./Navigation/HomeStackNavigation";
import UploadStackNavigation from "./Navigation/UploadStackNavigation";
import SettingsStackNavigation from "./Navigation/SettingsStackNavigation";
import ForumsScreen from "../screens/ForumsScreen";
import ForumsStackNavigation from "./Navigation/ForumsStackNavigation";

const AppStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.third,
          borderColor: COLORS.third,
          borderWidth: 1,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeNavigation") {
            iconName = Home2;
          } else if (route.name === "ForumsStackNavigation") {
            iconName = Message;
          } else if (route.name === "UploadNavigation") {
            iconName = AddSquare;
          } else if (route.name === "SettingsNavigation") {
            iconName = Setting;
          }

          return (
            <View>
              {React.createElement(iconName, {
                size: focused ? 28 : 24,
                color: focused ? COLORS.light : COLORS.white,
                variant: focused ? "Bold" : "Outline",
              })}
            </View>
          );
        },
      })}
      sceneContainerStyle={{
        backgroundColor: COLORS.primary,
      }}
      initialRouteName="HomeNavigation"
    >
      <Tab.Screen name="HomeNavigation" component={HomeStackNavigation} />
      <Tab.Screen name="ForumsStackNavigation" component={ForumsStackNavigation} />
      <Tab.Screen name="UploadNavigation" component={UploadStackNavigation} />
      <Tab.Screen
        name="SettingsNavigation"
        component={SettingsStackNavigation}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
