import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { COLORS, SIZES, FONT } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Login = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!userName.trim()) {
      Alert.alert("Validation", "Please enter your name.");
      return;
    }
    await AsyncStorage.setItem("userDetails", JSON.stringify({ userName }));
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Meditation App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={userName}
        onChangeText={setUserName}
        placeholderTextColor={COLORS.gray}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    padding: SIZES.large,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: SIZES.large,
  },
  input: {
    width: "100%",
    padding: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.small,
    fontSize: SIZES.medium,
    marginBottom: SIZES.large,
    color: COLORS.primary,
    backgroundColor: COLORS.white,
    fontFamily: FONT.regular,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    borderRadius: SIZES.small,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
});

export default Login;
