// import React, { useEffect, useState } from "react";
// import { AuthProvider } from "./AuthContext";
// import AppNavigator from "./navigation/AppNavigator";
// import { firebase } from "./firebase";
// import {
//   Provider as PaperProvider,
//   MD3DarkTheme as DarkTheme,
//   DefaultTheme,
// } from "react-native-paper";
// import {
//   requestUserPermission,
//   getFCMToken,
//   notificationListener,
// } from "./services/messaging";
// import ThemeToggle from "./components/ThemeToggle";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const App: React.FC = () => {
//   useEffect(() => {
//     requestUserPermission();
//     getFCMToken();
//     notificationListener();
//     loadTheme();
//   }, []);

//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   const toggleTheme = async () => {
//     const newTheme = !isDarkTheme;
//     setIsDarkTheme(newTheme);
//     await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
//   };

//   const loadTheme = async () => {
//     const savedTheme = await AsyncStorage.getItem("theme");
//     if (savedTheme) {
//       setIsDarkTheme(savedTheme === "dark");
//     }
//   };

//   return (
//     <AuthProvider>
//       <PaperProvider theme={isDarkTheme ? DarkTheme : DefaultTheme}>
//         <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
//         <AppNavigator />
//       </PaperProvider>
//     </AuthProvider>
//   );
// };

// export default App;
