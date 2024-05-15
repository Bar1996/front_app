import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
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
import Modal from "react-native-modal";

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
  const isFormValid =
    isNameValid && isPasswordValid && isEmailValid && isConfirmPasswordValid;
  const [isModalVisible, setModalVisible] = useState(false);

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
      console.log("Registration failed " + err);
    }
    navigation.navigate("Login");
  };

  const openCamera = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        onChangeImgUri(uri);
        setModalVisible(false);
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
        setModalVisible(false);
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={toggleModal}>
            {imgUri ? (
              <Image source={{ uri: imgUri }} style={styles.avatar} />
            ) : (
              <Image
                source={require("../assets/avatar.jpeg")}
                style={styles.avatar}
              />
            )}
            <Text style={{}}>Upload Image Here</Text>
          </TouchableOpacity>

          <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={openCamera} style={styles.iconRow}>
                <Ionicons name={"camera"} size={20} style={styles.icon} />
                <Text style={styles.iconText}>Upload image with Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={openGallery} style={styles.iconRow}>
                <Ionicons name={"image"} size={20} style={styles.icon} />
                <Text style={styles.iconText}>Upload image with Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleModal} style={styles.iconRow}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View>
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
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 12,
              }}
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
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 12,
              }}
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
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, !isFormValid && { opacity: 0.5 }]} // Optionally adjust style when disabled
            onPress={isFormValid ? onSave : undefined} // Only allow onSave if the form is valid
            disabled={!isFormValid} // Disable the button if not valid
          >
            <Text style={styles.buttonText}>Sign-up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10, // Horizontal padding for slight spacing from screen edges
    width: "100%", // Ensure it uses full width
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    alignSelf: "center",
    height: 120,
    width: 120,
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
    margin: 0, // Adjust position of icon
  },
  modalContent: {
    backgroundColor: "white", // Ensure this is visible against any background
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    // Add dimensions or positioning if necessary
    width: "80%", // Adjust width as necessary
    alignSelf: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10, // Add padding for better touch area
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  iconText: {
    fontSize: 16, // Optional: adjust text size
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "center", // This centers the text and link horizontally if your text is short
  },
});

export default Register;
