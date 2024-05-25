import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, FC, useEffect } from "react";

import { Button, IconButton } from "react-native-paper";
import { theme } from "../core/theme";
import GoogleSigninComp from "./GoogleSigninComp";

const Start: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ padding: 10, width: 230 }}>
        <Button mode="contained" onPress={() => navigation.navigate("Login")}>
          Login
        </Button>
      </View>
      <View style={{ padding: 10, width: 225 }}>
        <Button mode="outlined" onPress={() => navigation.navigate("Register")}>
          Sign Up
        </Button>
      </View>
      <View style={styles.divider}>
        <Text style={styles.dividerText}>Or connect using</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <GoogleSigninComp navigation={navigation} />
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
    backgroundColor: theme.colors.tint,
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
  divider: {
    position: "relative",
    width: "96%",
    height: 1,
    backgroundColor: theme.colors.text,
    marginVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  dividerText: {
    position: "absolute",
    backgroundColor: theme.colors.tint,
    fontSize: 13,
    color: theme.colors.text,
    padding: 8,
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 12,
  },
});

export default Start;
