import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { COLORS } from "../../constants/theme";
import UploadScreen from "../../screens/UploadScreen";
import UploadPreview from "../../screens/UploadPreview";

const UploadStackNavigation = () => {
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
      initialRouteName="Upload"
    >
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="UploadPreview" component={UploadPreview} />
    </Stack.Navigator>
  );
};

export default UploadStackNavigation;
