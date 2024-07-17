import React, { useContext, useEffect, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TaskListScreen from "../screens/TaskListScreen";
import CreateEditTaskScreen from "../screens/CreateEditTaskScreen";
import CategoryManagementScreen from "../screens/CategoryManagementScreen";

////////////////////////////////

import { RootStackParamList } from "./types";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { IconButton, Switch } from "react-native-paper";
import { View } from "react-native";
import { useAuth } from "../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator<RootStackParamList>();
DarkTheme;

const AppNavigator: React.FC = () => {
  const { signOut } = useAuth();
  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const handleSignOut = async () => {
  //   await signOut();
  //   AsyncStorage.removeItem("token");
  //   // navigation.navigate("Login"); // Redirect to Login screen
  // };

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    console.log(isDarkTheme);
  };

  useEffect(() => {
    toggleTheme;
  }, [isDarkTheme]);
  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="TaskList"
        screenOptions={{
          headerRight: () => {
            return (
              <Switch
                value={isDarkTheme}
                onValueChange={toggleTheme}
                color="white"
                style={{ flexDirection: "row" }}
              />
            );
          },
        }}
      >
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          // options={{
          //   headerRight: () => (
          //     // <IconButton icon="logout" size={24} onPress={handleSignOut} />
          //   ),
          // }}
        />
        <Stack.Screen name="CreateEditTask" component={CreateEditTaskScreen} />
        <Stack.Screen
          name="CategoryManagement"
          component={CategoryManagementScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
