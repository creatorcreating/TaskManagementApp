import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register(email, password);
      navigation.navigate("TaskList"); // Navigate to the task list screen
    } catch (error) {
      Alert.alert("Registration Failed", (error as Error).message);
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
        <Button title="Register" onPress={handleRegister} />
        <View style={{ margin: 10 }}>
          <Button
            title="Go to Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
