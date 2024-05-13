import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState, FC, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserModel, { IUser } from "../Model/UserModel";
import StudentModel from "../Model/StudentModel";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { confirmValidator } from "../helpers/confirmValidator";
import { IconButton } from "react-native-paper";
import { theme } from "../core/theme";

const Register: FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [imgUri, onChangeImgUri] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const isNameValid = nameValidator(name) === "";
  const isPasswordValid = passwordValidator(password) === "";
  const isEmailValid = emailValidator(email) === "";
  const isConfirmPasswordValid =
    confirmValidator(password, confirmPassword) === "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (passwordTouched) {
      setPasswordError(passwordValidator(password));
    }
  }, [password]);

  useEffect(() => {
    if (confirmPasswordTouched) {
      setConfirmPasswordError(confirmValidator(password, confirmPassword));
    }
  }, [confirmPassword]);

  useEffect(() => {
    if (emailTouched) {
      setEmailError(emailValidator(email));
    }
  }, [email]);

  useEffect(() => {
    if (nameTouched) {
      setNameError(nameValidator(name));
    }
  }, [name]);

  const askForCameraPermission = async () => {
    try {
      const permissionResult = await ImagePicker.getCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access camera is required!");
        return;
      }
    } catch (err) {
      console.log("fail getting permission " + err);
    }
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const onCancel = () => {
    console.log("Cancel");
    navigation.navigate("StudentListPage");
  };

  const onSave = async () => {
    console.log("Save");
    const user: IUser = {
      name: name,
      imgUrl: "url",
      password: password,
      email: email,
    };
    try {
      console.log("imgUri: " + imgUri);
      if (imgUri !== "") {
        const url = await StudentModel.uploadImage(imgUri);
        user.imgUrl = url;
        console.log("url: " + user.imgUrl);
      }
      await UserModel.registerUser(user);
    } catch (err) {
      console.log("fail adding student " + err);
    }
    navigation.navigate("StudentListPage");
  };

  const openCamera = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        onChangeImgUri(uri);
      }
    } catch (err) {
      console.log("fail opening camera " + err);
    }
  };

  const openGallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        onChangeImgUri(uri);
      }
    } catch (err) {
      console.log("fail opening camera " + err);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <View>
        {imgUri === "" && (
          <Image
            style={styles.avatar}
            source={require("../assets/avatar.jpeg")}
          />
        )}
        {imgUri !== "" && (
          <Image style={styles.avatar} source={{ uri: imgUri }} />
        )}

        <TouchableOpacity onPress={openCamera}>
          <Ionicons name={"camera"} style={styles.cameraButton} size={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <Ionicons name={"image"} style={styles.galleryButton} size={50} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setName(text);
          setNameTouched(true);
        }}
        value={name}
        placeholder="Enter your full name"
      />
      {nameTouched && nameError ? (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 12 }}
        >
          <Ionicons name="close-circle" size={25} color="#b22222" />
          <Text style={styles.errorText}>{nameError}</Text>
        </View>
      ) : null}
      {isNameValid && (
        <Ionicons
          name="checkmark-circle"
          size={25}
          color="green"
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 12 }}
        />
      )}
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
      {isPasswordValid && (
        <Ionicons
          name="checkmark-circle"
          size={25}
          color="green"
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 12,
          }}
        />
      )}

      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setConfirmPasswordTouched(true);
          }}
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
          placeholder="Confirm your password"
        />
        <IconButton
          icon={showConfirmPassword ? "eye-off" : "eye"}
          onPress={handleToggleConfirmPasswordVisibility}
          style={[
            styles.iconButton,
            { position: "absolute", right: 10, bottom: 12 },
          ]}
        />
      </View>
      {confirmPasswordTouched && confirmPasswordError ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 12,
          }}
        >
          <Ionicons name="close-circle" size={25} color="#b22222" />
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        </View>
      ) : null}
      {isConfirmPasswordValid && (
        <Ionicons
          name="checkmark-circle"
          size={25}
          color="green"
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 12,
          }}
        />
      )}

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
      {isEmailValid && (
        <Ionicons
          name="checkmark-circle"
          size={25}
          color="green"
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 12 }}
        />
      )}

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "blue",
  },
  avatar: {
    alignSelf: "center",
    height: 200,
    width: 200,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    padding: 10,
  },
  cameraButton: {
    position: "absolute",
    bottom: -10,
    left: 10,
    width: 50,
    height: 50,
  },
  galleryButton: {
    position: "absolute",
    bottom: -10,
    right: 10,
    width: 50,
    height: 50,
  },
  errorText: {
    color: "#b22222",
    marginLeft: 12,
  },
  iconButton: {
    margin: 0, // Adjust position of icon
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface, // Background color to match TextInput style
    borderColor: theme.colors.surface,
    borderWidth: 1,
    borderRadius: 10,
    height: 80, // Adjust height to match TextInput style
  },
});

export default Register;
