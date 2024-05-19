import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin'
import React, { useEffect, FC, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from 'expo-web-browser';
import { CLIENT_ID } from '../core/config';
import UserModel from '../Model/UserModel';
import { theme } from '../core/theme';


WebBrowser.maybeCompleteAuthSession();


const GoogleSigninComp: FC<{ navigation: any }> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID, // From Google Developer Console
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    console.log("Sign in button pressed", CLIENT_ID);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Sign-in successful');
      const credentialResponse = userInfo.idToken;
      const response = await UserModel.SignInWithGoogle(credentialResponse);
      if(response?.data.message ===  "Login successful"){
        navigation.navigate("PostsListScreen");
        ToastAndroid.show("Welcome Back", ToastAndroid.TOP);
    }
      // You can now use this userInfo object to authenticate the user in your backend
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened', error);
      }
    }finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error: any) {
      console.error(error);
    }
  };




  return (
    <View style={styles.container}>

      
      <Button onPress={signOut} title="Sign out" />
      <View>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} /> // Display the loading indicator
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
}

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