import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, FC, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IconButton } from "react-native-paper";
import { theme } from "../core/theme";
import UserModel from "../Model/UserModel";
import { useAuth } from "../AuthContext";

const Login: FC<{ navigation: any }> = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (emailTouched) {
      if (email.length === 0) {
        setEmailError("Email is required");
      } else {
        setEmailError("");
      }
    }
  }, [email]);

  useEffect(() => {
    if (passwordTouched) {
      if (password.length === 0) {
        setPasswordError("Password is required");
      } else {
        setPasswordError("");
      }
    }
  }, [password]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setEmail("");
      setPassword("");
      setEmailTouched(false);
      setPasswordTouched(false);
    });

    return unsubscribe;
  }, [navigation]);

  const OnLoginPress = async () => {
    setIsLoading(true);
    console.log("Login Button Pressed");
    try {
      const response = await UserModel.login(email.toLowerCase(), password);
      if (response?.data.message === "Login successful") {
        setIsAuthenticated(true);
        navigation.navigate("PostsListScreen");
        ToastAndroid.show("Welcome Back", ToastAndroid.TOP);
      }
    } catch (err: any) {
      console.log("Login failed " + err);
      const errorMessage =
        err.response?.data || err.message || "An error occurred during Login.";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setEmail(text);
          setEmailTouched(true);
        }}
        value={email}
        placeholder="Enter your email"
      />
      {emailTouched && emailError ? (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 12 }}
        >
          <Ionicons name="close-circle" size={25} color="#b22222" />
          <Text style={styles.errorText}>{emailError}</Text>
        </View>
      ) : null}
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordTouched(true);
          }}
          value={password}
          secureTextEntry={!showPassword}
          placeholder="Enter your password"
        />
        <IconButton
          icon={showPassword ? "eye-off" : "eye"}
          onPress={handleTogglePasswordVisibility}
          style={[
            styles.iconButton,
            { position: "absolute", right: 10, bottom: 12 },
          ]}
        />
      </View>

      {passwordTouched && passwordError ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 12,
          }}
        >
          <Ionicons name="close-circle" size={25} color="#b22222" />
          <Text style={styles.errorText}>{passwordError}</Text>
        </View>
      ) : null}

      <View style={styles.buttons}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} /> // Display the loading indicator
        ) : (
          <TouchableOpacity style={styles.button} onPress={OnLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
  },
  input: {
    width: 350,
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    width: "50%",
    marginVertical: 10,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#007BFF",
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
    color: "#FFFFFF",
  },
  errorText: {
    color: "#b22222",
    marginLeft: 12,
  },
  iconButton: {
    position: "absolute",
    right: 10,
    bottom: 12,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "center", // This centers the text and link horizontally if your text is short
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default Login;
