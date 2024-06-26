import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import React, { useEffect, FC, useState } from "react";
import {
  View,
  ToastAndroid,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { CLIENT_ID } from "../core/config";
import UserModel from "../Model/UserModel";
import { theme } from "../core/theme";
import { useAuth } from '../AuthContext';

WebBrowser.maybeCompleteAuthSession();

const GoogleSigninComp: FC<{ navigation: any }> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    console.log("Sign in button pressed", CLIENT_ID);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("Sign-in successful");
      const credentialResponse = userInfo.idToken;
      const response = await UserModel.signInWithGoogle(credentialResponse);
      if (response?.data.message === "Login successful") {
        setIsAuthenticated(true); // Update authentication state
        navigation.navigate("PostsListScreen");
        ToastAndroid.show("Welcome Back", ToastAndroid.TOP);
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available or outdated");
      } else {
        console.log("Some other error happened", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        )}
      </View>
    </View>
  );
};

export default GoogleSigninComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.tint,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
