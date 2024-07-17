import React, { useCallback, useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useTheme } from "@react-navigation/native";

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (user) {
        navigation.navigate("TaskList");
      }
    }, [user])
  );
  // if (user) {
  //   navigation.navigate("TaskList");
  //  ERROR  Warning: Cannot update a component (`ForwardRef(BaseNavigationContainer)`) while rendering a different component
  // }

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navigate to the task list screen after successful login
      navigation.navigate("TaskList");
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: colors.card }}>
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.text}
        value={email}
        onChangeText={setEmail}
        style={{
          marginBottom: 10,
          borderWidth: 1,
          padding: 10,
          color: colors.text,
        }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.text}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          marginBottom: 10,
          borderWidth: 1,
          padding: 10,
          color: colors.text,
        }}
      />
      <View style={{ margin: 10 }}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={{ margin: 10 }}>
        <Button
          title="Go to Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
