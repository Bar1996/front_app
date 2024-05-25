import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { FC, useState } from "react";
import { theme } from "../core/theme";
import UserModel from "../Model/UserModel";
import { useAuth } from '../AuthContext';


const Settings: FC<{ navigation: any }> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setIsAuthenticated } = useAuth();

const onLogoutPress = async () => {
  console.log("Logout Button Pressed");
  try {
    setIsLoading(true);
    await UserModel.check();
    await UserModel.logout();
    setIsAuthenticated(false); // Update authentication state
    navigation.navigate("Start");
    ToastAndroid.show(
      "Goodbye 👋, See you again soon 😊",
      ToastAndroid.SHORT
    );
  } catch (err) {
    console.log("Logout failed " + err);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  button: {
    width: "80%",
    paddingVertical: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Settings;
