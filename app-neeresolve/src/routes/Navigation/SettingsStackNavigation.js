import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../../screens/SettingsScreen";
import { COLORS } from "../../constants/theme";

const SettingsStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.primary,
        },
        animationEnabled: false,
        animationTypeForReplace: "push",
        statusBarAnimation: "slide",
        animation: "slide_from_right",
        navigationBarColor: COLORS.secondary,
        statusBarStyle: "dark",
      }}
      initialRouteName="SettingsScreen"
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigation;
