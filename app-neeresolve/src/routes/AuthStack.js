import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import { COLORS } from "../constants/theme";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

const AuthStack = () => {
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
      initialRouteName="WelcomeScreen"
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
