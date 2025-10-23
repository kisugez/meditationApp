import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { COLORS, SIZES, FONT } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!userName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    await AsyncStorage.setItem("userDetails", JSON.stringify({ userName, email }));
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/icons/1_logo.png")} style={styles.logo} />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to start your meditation journey</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        placeholderTextColor={COLORS.gray}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={COLORS.gray}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={COLORS.gray}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/login")}> 
        <Text style={styles.signupText}>Already have an account? Login</Text>
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: SIZES.large,
    borderRadius: 20,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: SIZES.small,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: SIZES.large,
    fontFamily: FONT.regular,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: SIZES.medium,
    marginBottom: SIZES.small,
    fontFamily: FONT.medium,
    textAlign: "center",
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
    marginBottom: SIZES.small,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  signupText: {
    color: COLORS.secondary,
    fontSize: SIZES.medium,
    marginTop: SIZES.small,
    fontFamily: FONT.medium,
  },
});

export default Signup;
