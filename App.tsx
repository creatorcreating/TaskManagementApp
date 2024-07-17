import React, { useEffect, useState } from "react";
import { AuthProvider } from "./AuthContext";
import AppNavigator from "./navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import { Provider as PaperProvider } from "react-native-paper";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ThemeToggle from "./components/ThemeToggle";
// import { firebase } from "./firebase";
// import {
//   requestUserPermission,
//   getFCMToken,
//   notificationListener,
// } from "./services/messaging";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});
const App: React.FC = () => {
  useEffect(() => {
    // requestUserPermission();
    // getFCMToken();
    // notificationListener();
  }, []);

  return (
    <AuthProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
