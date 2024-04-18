import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../../screens/SettingsScreen";
import { COLORS } from "../../constants/theme";
import ForumsScreen from "../../screens/ForumsScreen";
import SolutionScreen from "../../screens/SolutionScreen";

const ForumsStackNavigation = () => {
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
      initialRouteName="Forums"
    >
      <Stack.Screen name="Forums" component={ForumsScreen} />
      <Stack.Screen
        name="Solutions"
        component={SolutionScreen}
        getId={({ params }) => params.reportId}
      />
    </Stack.Navigator>
  );
};

export default ForumsStackNavigation;
