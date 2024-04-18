import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Home2, Message, Setting } from "iconsax-react-native";

import { COLORS, SIZES } from "../constants/theme";
import AdminMapStackNavigation from "./Navigation/AdminMapStackNavigation";
import AdminReportStackNavigation from "./Navigation/AdminReportStackNavigation";
import SettingsStackNavigation from "./Navigation/SettingsStackNavigation";

const AdminStack = () => {
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

          if (route.name === "AdminMapStackNavigation") {
            iconName = Home2;
          } else if (route.name === "SettingsNavigation") {
            iconName = Setting;
          } else if (route.name === "AdminReportStackNavigation") {
            iconName = Message;
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
      initialRouteName="AdminMapStackNavigation"
    >
      <Tab.Screen
        name="AdminMapStackNavigation"
        component={AdminMapStackNavigation}
      />
      <Tab.Screen name="AdminReportStackNavigation" component={AdminReportStackNavigation} />
      <Tab.Screen
        name="SettingsNavigation"
        component={SettingsStackNavigation}
      />
    </Tab.Navigator>
  );
};

export default AdminStack;
