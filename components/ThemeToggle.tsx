// ThemeToggle.tsx
import React from "react";
import { View, Switch, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface ThemeToggleProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkTheme,
  toggleTheme,
}) => {
  return (
    <View style={styles.container}>
      <Text>Dark Theme</Text>
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 16,
    maxWidth: "auto",
  },
});

export default ThemeToggle;
