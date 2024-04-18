import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../../constants/theme";
import AdminReportScreen from "../../screens/AdminReportScreen";

const AdminReportStackNavigation = () => {
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
      initialRouteName="ReportScreen"
    >
      <Stack.Screen name="ReportScreen" component={AdminReportScreen} />
    </Stack.Navigator>
  );
};

export default AdminReportStackNavigation;
