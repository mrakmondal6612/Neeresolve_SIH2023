import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import AdminStack from "./AdminStack";

const AppNavigation = () => {
  const { currentUser } = useSelector((state) => state.user);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {currentUser ? (
          currentUser?.isAdmin ? (
            <AdminStack />
          ) : (
            <AppStack />
          )
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default AppNavigation;
